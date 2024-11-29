import { createElysia } from '~/server/api/elysia'
import { getUser, screenshot } from './user.controller'
import { error } from 'elysia'

export const userRouter = createElysia({ prefix: '/user' })
  .get('/get', async ({ session: { user: { email } } }) => {
    const response = await getUser(email)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  })
  .get('/check-username/:username', async () => {
    'this use to check username'
  })
  .post('/screenshot', async () => {
    return await screenshot()
  })
