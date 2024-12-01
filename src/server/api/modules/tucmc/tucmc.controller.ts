import { prisma } from "~/server/db/prisma"
import { IStaffData, IStaffInfo } from "./tucmc.dto"
import { Workbook } from 'exceljs'
import fs from 'fs'
import path from 'path'

export const addStaff = async (email: string, body: IStaffData): Promise<{ status: number, message: string }> => {
  try {
    await prisma.user.update({
      where: { email },
      data: {
        isStaff: true,
        staff: {
          organization: body.organization,
          tag: body.tag,
          gate: body.gate
        }
      }
    })
    return { status: 200, message: 'Staff added successfully' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Failed to add staff' }
  }
}

export const getStaff = async (email: string): Promise<{ status: number, message: string, data?: IStaffInfo }> => { 
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if (!user) return { status: 404, message: 'User not found' }
    if (!user?.isStaff || !user.staff) return { status: 400, message: 'User is not staff' }
    const parsedData: IStaffInfo = {
      email: user.email!,
      firstname: user.firstname!,
      lastname: user.lastname!,
      staff: user.staff
    }
    return { status: 200, message: 'Staff found', data: parsedData }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Failed to get staff' }
  }
}

export const getStats = async () => {
  try {
    const userOnSite = await prisma.user.count()
    const userOnDay1 = await prisma.user.count({
      where: {
        event: {
          some: {
            day: "1",
            join: true
          }
        }
      }
    })
    const userOnDay2 = await prisma.user.count({
      where: {
        event: {
          some: {
            day: "2",
            join: true
          }
        }
      }
    })

    const joinedUser = userOnDay1 + userOnDay2

    const data = {
      'ผู้ใช้งานบนเว็บ': userOnSite,
      'ผู้ที่มางานวันแรก': userOnDay1,
      'ผู้ที่มางานวันที่สอง': userOnDay2,
      'ผู้ที่มางานรวมสองวัน': joinedUser
    }

    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Stats')

    worksheet.columns = [
      { header: 'Metric', key: 'metric', width: 20 },
      { header: 'Value', key: 'value', width: 10 }
    ]

    worksheet.addRows([
      { metric: 'ผู้ใช้งานบนเว็บ', value: userOnSite },
      { metric: 'ผู้ที่มางานวันแรก', value: userOnDay1 },
      { metric: 'ผู้ที่มางานวันที่สอง', value: userOnDay2 },
      { metric: 'ผู้ที่มางานรวมสองวัน', value: joinedUser }
    ])

    const outputDir = path.join(process.cwd(), '_stats')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const filename = `stats-${new Date().toISOString().split('T')[0]}.xlsx`
    const filepath = path.join(outputDir, filename)

    await workbook.xlsx.writeFile(filepath)

    return {
      status: 200,
      message: 'Excel file saved successfully',
      data,
      filepath,
    }

  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Failed to get stats' }
  }
}
