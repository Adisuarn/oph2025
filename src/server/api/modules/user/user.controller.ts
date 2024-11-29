import { prisma } from "~/server/db/prisma";
import { User as IUser } from "@prisma/client";
import chromium from '@sparticuz/chromium-min'
import puppeteer from 'puppeteer-core'

export const getUser = async (email: string): Promise<{ status: number, message: string, data?: IUser }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if (!user) {
      return { status: 404, message: 'User not found' }
    }
    return { status: 200, message: 'User found', data: user }
  } catch (error) {
    console.log(error)  
    return { status: 500, message: 'Internal server error' }
  }
}

export const screenshot = async () => {
  const chromiumPack = "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(chromiumPack),
    headless: true
  })

  const page = await browser.newPage()

  await page.goto('https://www.google.com', { waitUntil: 'networkidle0' })
  const title = await page.evaluate(() => {
    return document.title
  })

  return JSON.stringify({ title })
}
