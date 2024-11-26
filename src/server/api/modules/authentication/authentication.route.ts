import { createElysia } from '~/server/api/elysia'
import { registerUser } from './authentication.controller'
import { RegisterValidator } from './authentication.dto'

export const authRouter = createElysia({ prefix: '/authentication'})
  .get('/', async ({ session }) => {
    return session.user
  })
  .patch('/', async ({ body, session }) => {
    return registerUser(body, session.user.email)
  },
  {
    body: RegisterValidator
  })
