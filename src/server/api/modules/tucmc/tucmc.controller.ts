import { prisma } from "~/server/db/prisma"
import { IStaff } from "./tucmc.dto"
import { User as IUser } from "@prisma/client"

export const addStaff = async (email: string, body: IStaff): Promise<{ status: number, message: string }> => {
  try {
    await prisma.user.update({
      where: { email },
      data: {
        isStaff: true,
        ...body
      }
    })
    return { status: 200, message: 'Staff added successfully' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Failed to add staff' }
  }
}

export const getStaff = async (email: string): Promise<{ status: number, message: string, data?: IUser }> => { 
  try {
    const staff = await prisma.user.findUnique({
      where: { email }
    })
    if (!staff?.isStaff) return { status: 400, message: 'User is not a staff' }
    if (!staff) return { status: 404, message: 'Staff not found' }
    return { status: 200, message: 'Staff found', data: staff }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Failed to get staff' }
  }
}
