import { PrismaClient } from '@prisma/client'
import { PrismaClientOptions } from '@prisma/client/runtime/library'
import { env } from '~/env'

const createPrismaClient = () => 
  new PrismaClient({
    //log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    omit: {
      user: {
        id: true,
        emailVerified: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      }
    } as PrismaClientOptions['omit']
  })

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if(env.NODE_ENV === 'development') globalForPrisma.prisma = prisma
