import { createElysia } from '~/server/api/elysia'
import { authRouter } from './modules/authentication/authentication.route'

export const appRouter = createElysia({ prefix: '/api/elysia' })
  .use(authRouter)
  .compile()

export type AppRouter = typeof appRouter
