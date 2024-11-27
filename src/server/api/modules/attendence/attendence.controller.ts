import { getUserByEmail } from "~/server/utils/database"
import { prisma } from "~/server/db/prisma"

export const confirmCode = async (email: string, day: string, code: string): Promise<{ status: number, message: string }> => {
  const user = await getUserByEmail(email)
  if (!user) return { status: 404, message: 'User Not Found' }
  if (user.code !== code) return { status: 400, message: 'Invalid Code' }
  if (user.event.filter(e => e.day === day).length > 0) return { status: 400, message: 'Already Confirmed' }
  switch (day) {
    case '1': {
      if()
    }
  }
  try {
    await prisma.user.upsert({
      where: { email, code },
      update: {
        event: {
          day,
          join: true,
          dayTime: new Date()
        }
      },
      create: {
        event: {
          day,
          join: true,
          dayTime: new Date()
        }
      }
    })
    return { status: 200, message: 'Code Confirmed' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Error while confirming code' }
  }
}
