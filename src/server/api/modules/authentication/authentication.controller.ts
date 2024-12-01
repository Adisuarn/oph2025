import { User as IUser } from "@prisma/client"
import { IUserData } from "./authentication.dto"
import { prisma } from '~/server/db/prisma'
import { generateUniqueCode } from "~/server/utils"

export const registerUser = async (body: IUserData, email: string): Promise<{ status: number, message: string, data?: IUser }> => {
  const code = await generateUniqueCode()
  try {
    const isUserDuplicate = await prisma.user.findUnique({
      where: { username: body.username }
    })
    if (isUserDuplicate) return { status: 400, message: 'Username is already used'}
    const user = await prisma.user.update({
      where: { email },
      data: {
        ...body,
        isRegister: true,
        code: code
      }
    })
    return { status: 200, message: 'User registered successfully', data: user }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Failed to register user' }
  }
}
