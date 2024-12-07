import { t } from 'elysia'
import { UnionField } from '~/server/utils'

export const confirmValidator = t.Object({
  code: t.String({
    minLength: 5,
    maxLength: 5,
    error: 'Invalid Code Length'
  }),
  day: UnionField(['1', '2'], 'Invalid Day On Request')
})

export const checkValidator = t.Object({
  code: t.String({
    minLength: 5,
    maxLength: 5,
    error: 'Invalid Code Length'
  })
})
