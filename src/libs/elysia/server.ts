import 'server-only'

import { treaty } from '@elysiajs/eden'
import { appRouter } from '~/server/api/root'
import { env } from '~/env'

export const api = treaty(appRouter, {
  headers: {
    'x-api-key': env.NEXT_PUBLIC_API_KEY
  }
}).api.elysia
