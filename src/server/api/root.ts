import { createElysia } from '~/server/api/elysia'
import { helloRouter } from '~/server/api/routes/hello'

export const appRouter = createElysia({ prefix: '/api/elysia'})
  .use(helloRouter)
  .compile()

export type AppRouter = typeof appRouter
