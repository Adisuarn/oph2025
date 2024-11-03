import { t } from 'elysia'

import { createElysia } from '~/server/api/elysia'

export const helloRouter = createElysia({ prefix: '/hello'})
  .get('/', () => 'hello')
