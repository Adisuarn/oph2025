import { createElysia } from '~/server/api/elysia'
import { error, t } from 'elysia'

export const attendenceRouter = createElysia({ prefix: '/attendence' })
  .get('/', () => {
    'hello'
  })
  .post('/:code', async ({ session, prisma, params: { code } }) => {
    if (!session) return error(401, 'Unauthorized')
    const isExist = await prisma.user.findUnique({
      where: {
        code
      }
    })
    if (!isExist) return error(404, 'Code Not found')
    
  }, {
    params: t.Object({
      code: t.String()
    })
  })
