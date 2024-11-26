import { prisma } from "~/server/db/prisma"

const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    code += chars[randomIndex]
  }
  return code
}

export const generateUniqueCode = async () => {
  let uniqueCode = ''
  let codeExists = true

  while (codeExists) {
    uniqueCode = generateCode()

    const existingCode = await prisma.user.findUnique({
      where: {
        code: uniqueCode
      }
    })

    codeExists = existingCode !== null
  }

  return uniqueCode
}
