import { t } from 'elysia'
import { StringField } from '~/server/utils'

export const UsernameParam = t.Object({
  username: StringField(true, 'Invalid Username')
})
