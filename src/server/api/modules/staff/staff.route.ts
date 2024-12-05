import { createElysia } from '~/server/api/elysia'
import { error } from 'elysia'
import { paramsValidator } from './staff.dto'
import { confirmCode } from './staff.controller'

export const staffRouter = createElysia({ prefix: '/staff' })
  .onBeforeHandle(({ session }) => {
    if(!session.user.isStaff) return error(403, 'Staff Access Denied')
  })
  .post('/:day/:code', async ({ session, params: { day, code } }) => {
    const response = await confirmCode(session.user, day, code)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  }, {
    params: paramsValidator
  })
