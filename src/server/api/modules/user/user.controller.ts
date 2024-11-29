import { prisma } from "~/server/db/prisma";
import { User as IUser } from "@prisma/client";
import chromium from '@sparticuz/chromium-min'
import puppeteer from 'puppeteer-core'
import { env } from "~/env";
import { ImageResponse } from '@vercel/og'

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
  let browser = null;
  try {

    if (env.NODE_ENV === 'development') {
      browser = await puppeteer.launch({
        executablePath: process.platform === "win32"
          ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
          : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });
    }
    if (env.NODE_ENV === 'production') {
      browser = await puppeteer.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath("https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"),
        headless: chromium.headless,
      });
    }

    const page = await browser!.newPage();

    await page.goto('https://www.google.com', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    const title = await page.title();

    return Response.json({
      success: true,
      title
    });

  } catch (error) {
    console.error('Screenshot error:', error);
    return Response.json({
      success: false,
      error: error
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
