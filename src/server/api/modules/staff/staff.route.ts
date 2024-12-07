import { createElysia } from '~/server/api/elysia'
import { error } from 'elysia'
import { confirmValidator, checkValidator } from './staff.dto'
import { checkCode, confirmCode } from './staff.controller'

export const staffRouter = createElysia({ prefix: '/staff' })
  .onBeforeHandle(({ session }) => {
    if (!session.user.isStaff) return error(403, 'Staff Access Denied')
  })
  .get('/checkcode/:code', async ({ params: { code } }) => {
    code = code.toUpperCase()
    const response = await checkCode(code)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  }, {
    params: checkValidator
  })
  .post('/confirmcode/:day/:code', async ({ session, params: { day, code } }) => {
    code = code.toUpperCase()
    const response = await confirmCode(session.user, day, code)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  }, {
    params: confirmValidator
  })
