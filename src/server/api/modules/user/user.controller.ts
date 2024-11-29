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
  const browser = await puppeteer.launch({
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'),
    headless: chromium.headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.goto('https://www.google.com');

  const title = await page.title();

  await browser.close();

  return Response.json({
    title
  });
}
