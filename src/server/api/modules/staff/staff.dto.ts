import { t } from 'elysia'
import { UnionField } from '~/server/utils'

export const paramsValidator = t.Object({
  code: t.String(),
  day: UnionField(['1', '2'], 'Invalid Day On Request')
})
