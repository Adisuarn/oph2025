import { error } from 'elysia'
import { createElysia } from '~/server/api/elysia'
import { RegStaffValidator } from './tucmc.dto'
import { addStaff, getStaff, getStats } from './tucmc.controller'

export const tucmcRouter = createElysia({ prefix: '/tucmc' })
  .onBeforeHandle(async ({ session }) => { 
    if (!session.user.isTUCMC) return error(403, 'TUCMC Access Denied')
  })
  .get('/stats', async () => {
    const response = await getStats()
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  })
  .patch('/add-staff', async ({ body }) => {
    const response = await addStaff(body.email, body)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  },
    {
    body: RegStaffValidator
    }
  ) 
  .get('/get-staff/:email', async ({ params: { email } }) => {
    const response = await getStaff(email)
    if (response.status !== 200) {
      return error(response.status, response.message)
    }
    return response
  })
