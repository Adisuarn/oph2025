import { t } from 'elysia'

import { createElysia } from '~/server/api/elysia'

export const authRouter = createElysia({ prefix: '/authentication'})
  .get('/', async ({ session }) => {
    return session.user
  })
  .patch('/', async ({ body, session }) => {
    
  })
