import { createElysia } from '~/server/api/elysia'
import { getUser, isUsernameExist } from './user.controller'
import { error } from 'elysia'
import { UsernameParam } from './user.dto'

export const userRouter = createElysia({ prefix: '/user' })
  .get('/get-user/:email', async ({ params: { email }}) => {
    const response = await getUser(email)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  })
  .get('/check-username/:username', async ({ params: { username }}) => {
    const response = await isUsernameExist(username)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  }, {
    params: UsernameParam
  })
