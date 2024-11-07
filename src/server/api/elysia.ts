import type { ElysiaConfig } from "elysia"
import Elysia from "elysia"

import { auth } from "~/server/auth"
import { prisma } from '~/server/db/prisma'

const createContext = new Elysia()
  .derive(async ({ error }) => {
    const session = await auth()
    if (!session) {
      return error(401, 'Unauthorized')
    }
    return { prisma, session }
  })
  .as('plugin')

const timmingMiddleware = new Elysia()
  .state({ start: 0 })
  .onBeforeHandle(({ store }) => (store.start = Date.now()))
  .onAfterHandle(({ path, store: { start } }) => {
    console.log(`\x1b[32m[Elysia]\x1b[0m ${path} took \x1b[33m${Date.now() - start}ms\x1b[0m to execute`)
  })
  .as('plugin')

export const createElysia = <P extends string, S extends boolean>(options?: ElysiaConfig<P, S>) =>
  new Elysia({
    ...options,
    aot: true,
  })
    .use(createContext)
    .use(timmingMiddleware)

