import { createElysia } from '~/server/api/elysia'
import { authRouter } from './modules/authentication/authentication.route'
import { attendenceRouter } from './modules/attendence/attendence.route'

export const appRouter = createElysia({ prefix: '/api/elysia' })
  .use(authRouter)
  .use(attendenceRouter)
  .compile()

export type AppRouter = typeof appRouter
