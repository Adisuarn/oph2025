import type { ElysiaConfig } from "elysia"
import { Elysia, error } from "elysia"

import { auth } from "~/server/auth"
import { prisma } from '~/server/db/prisma'
import { env } from "~/env"

const createContext = new Elysia()
  .derive(async ({ error }) => {
    const session = await auth()
    if (!session) return error(401, 'Unauthorized')
    return { prisma, session }
  })
  .as('plugin')

const timmingMiddleware = new Elysia()
  .state({ start: 0 })
  .onBeforeHandle(({ store }) => (store.start = Date.now()))
  .onAfterHandle(({ path, store: { start }, request: { method }, response: { code } }: { path: string, store: { start: number }, request: { method: string }, response: { code: number } }) => {
    const status = code >= 400 ? `\x1b[31m${code}` : `\x1b[32m${code}`
    console.log(`\x1b[32m[Server] [ \x1b[33m${method} / ${status} \x1b[32m] \x1b[0m ${path} took \x1b[33m${Date.now() - start}ms\x1b[0m to execute`)
  })
  .as('plugin')

const globalGuard = new Elysia()
  .onBeforeHandle(async ({ request: { headers } }) => {
    if (headers.get('x-api-key') !== env.NEXT_PUBLIC_API_KEY) 
      return error(401, "Incorrect API key provided")
  })

export const createElysia = <P extends string, S extends boolean>(options?: ElysiaConfig<P, S>) =>
  new Elysia({
    ...options,
    aot: true,
  })
    .use(createContext)
    .use(timmingMiddleware)
    .use(globalGuard)

