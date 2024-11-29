import { createElysia } from '~/server/api/elysia'
import { authRouter } from './modules/authentication/authentication.route'
import { staffRouter } from './modules/staff/staff.route'
import { tucmcRouter } from './modules/tucmc/tucmc.route'

export const appRouter = createElysia({ prefix: '/api/elysia' })
  .use(authRouter)
  .use(staffRouter)
  .use(tucmcRouter)
  .compile()

export type AppRouter = typeof appRouter
