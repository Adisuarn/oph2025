import { User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (!user) return null
  return user
}
