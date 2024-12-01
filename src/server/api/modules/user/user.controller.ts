import { prisma } from "~/server/db/prisma";
import { User as IUser } from "@prisma/client";
import puppeteerCore from 'puppeteer-core'
import puppeteer from "puppeteer";
import chromium from '@sparticuz/chromium-min'
import { env } from "~/env";

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
