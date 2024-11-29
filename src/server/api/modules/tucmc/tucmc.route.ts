import { error } from 'elysia'
import { createElysia } from '~/server/api/elysia'
import { RegStaffValidator } from './tucmc.dto'
import { addStaff, getStaff } from './tucmc.controller'

export const tucmcRouter = createElysia({ prefix: '/tucmc' })
  .onBeforeHandle(async ({ session }) => { 
    if (!session.user.isTUCMC) return error(403, 'TUCMC Access Denied')
  })
  .get('/stats', async () => {
    'this use to get stats'
  })
  .patch('/add-staff', async ({ session, body }) => {
    const response = await addStaff(session.user.email, body)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  }, {
    body: RegStaffValidator
  }) 
  .get('/get-staff', async ({ session }) => {
    const response = await getStaff(session.user.email)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  })
