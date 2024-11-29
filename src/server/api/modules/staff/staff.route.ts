import { createElysia } from '~/server/api/elysia'
import { error } from 'elysia'
import { paramsValidator } from './staff.dto'
import { confirmCode } from './staff.controller'

export const staffRouter = createElysia({ prefix: '/attendence' })
  .onBeforeHandle(({ session }) => {
    if(!session.user.isStaff) return error(403, 'Staff Access Denied')
  })
  .post('/:day/:code', async ({ session, prisma, params: { code, day } }) => {
    const user = await prisma.user.findUnique({ 
      where: { email: session.user.email }
    })
    if (!user?.code) return error(404, "User's code doesn't exist")
    if (user.code !== code) return error(400, 'Invalid Code')
    const response = await confirmCode(user, day, code)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  }, {
    params: paramsValidator
  })
