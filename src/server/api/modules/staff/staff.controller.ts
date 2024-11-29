import { prisma } from "~/server/db/prisma"
import { User } from "@prisma/client"
import { getDate, Gates } from "~/server/utils"

export const confirmCode = async (user: User, day: string, code: string): Promise<{ status: number, message: string }> => {
  // switch (day) {
  //   case '1': {
  //     if (!getDate().includes('2025/01/10')) return { status: 400, message: 'Time on day 1 is not correct' }
  //     break
  //   }
  //   case '2': {
  //     if (!getDate().includes('2025/01/11')) return { status: 400, message: 'Time on day 2 is not correct' }
  //     break
  //   }
  //   default: {
  //     return { status: 400, message: 'Invalid Day' }
  //   }
  // }
  if (user.event.filter(e => e.day === day).length > 0) return { status: 400, message: 'Already Confirmed' }
  try {
    await prisma.user.upsert({
      where: {
        email: user.email!,
        code
      },
      update: {
        event: {
          day,
          join: true,
          dayTime: getDate(),
          gate: Gates.Phayathai
        }
      },
      create: {
        event: {
          day,
          join: true,
          dayTime: getDate(),
          gate: Gates.Phayathai
        }
      }
    })
    return { status: 200, message: 'Code Confirmed' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Error while confirming code' }
  }
}
