import { createElysia } from '~/server/api/elysia'
import { error } from 'elysia'
import { registerUser } from './authentication.controller'
import { RegisterValidator } from './authentication.dto'

export const authRouter = createElysia({ prefix: '/authentication'})
  .patch('/', async ({ body, session }) => {
    const response = await registerUser(body, session.user.email)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  },
  {
    body: RegisterValidator
  })
