import { prisma } from "~/server/db/prisma"
import { getDate } from "~/server/utils"
import { User as IUser } from "next-auth"

export const confirmCode = async (staffUser: IUser, day: string, code: string): Promise<{ status: number, message: string }> => {
  const staffData = await prisma.user.findUnique({
    where: { email: staffUser.email! }
  })
  if (!staffData?.staff) return { status: 404, message: 'Staff Data Not Found' }
  const user = await prisma.user.findUnique({
    where: { code }
  })
  if (!user?.code) return { status: 404, message: "Provided Code Incorrect" }
  if (user.event.length >= 2) return { status: 400, message: 'User already joined on both day'}
  
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
        code,
      },
      update: {
        event: {
          push: {
            day,
            join: true,
            dayTime: getDate(),
            gate: staffData.staff.gate!,
          }
        }
      },
      create: {
        event: [{
          day,
          join: true,
          dayTime: getDate(),
          gate: staffData.staff.gate!,
        }]
      },
    })
    return { status: 200, message: `Code Confirmed on day ${day}` }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Error while confirming code' }
  }
}
