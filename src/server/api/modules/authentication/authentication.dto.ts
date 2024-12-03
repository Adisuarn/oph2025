import { t } from 'elysia'

export interface IUserData {
  prefix: string
  username: string
  firstname: string
  lastname: string
  status: string
  school: string
  classlvl: string
  purpose: string[]
  platform: string[]
}

export const RegisterValidator = t.Object({
  prefix: t.String(),
  username: t.String(),
  firstname: t.String(),
  lastname: t.String(),
  status: t.String(),
  school: t.String(),
  classlvl: t.String(),
  purpose: t.Array(t.String()),
  platform: t.Array(t.String())
})
