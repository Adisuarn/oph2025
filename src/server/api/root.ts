import { createElysia } from '~/server/api/elysia'

export const appRouter = createElysia({ prefix: '/api/elysia'})
  .compile()

export type AppRouter = typeof appRouter
