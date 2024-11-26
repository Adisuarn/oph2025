import { IUserData } from "./authentication.dto"
import { prisma } from '~/server/db/prisma'
import { generateUniqueCode } from "~/server/utils/generateCode"

export const registerUser = async (body: IUserData, email: string) => {
  const code = await generateUniqueCode()
  const user = await prisma.user.update({
    where: { email },
    data: {
      ...body,
      isRegister: true,
      code: code
    }
  })
  return { status: 200, message: 'User registered successfully', data: user }
}
