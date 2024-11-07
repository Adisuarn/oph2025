import { prisma } from "~/server/db/prisma";

export const getUserByEmail = async (email: string) => {
  const document = await prisma.user.findUnique({
    where: {
      email
    }
  })
  return document
}
