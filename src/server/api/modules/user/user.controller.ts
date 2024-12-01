import { prisma } from "~/server/db/prisma";
import { User as IUser } from "@prisma/client";

export const getUser = async (email: string): Promise<{ status: number, message: string, data?: IUser }> => {
  try {
    email = decodeURIComponent(email)
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if (!user) {
      return { status: 404, message: 'User not found' }
    }
    return { status: 200, message: 'User found', data: user }
  } catch (error) {
    console.log(error)  
    return { status: 500, message: 'Failed to get user' }
  }
}

export const isUsernameExist = async (username: string): Promise<{ status: number, isDuplicate?: boolean, message?: string }> => {
  try {
    const isDuplicate = await prisma.user.findUnique({
      where: { username }
    })
    if (isDuplicate) return { status: 200, isDuplicate: true }
    else return { status: 200, isDuplicate: false }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Failed to check username' }
  }
}
