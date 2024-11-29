import { t } from 'elysia'

export interface IUserData {
  username: string;
  firstname: string
  lastname: string
  status: string
  school: string
  classlvl: string
}

export const RegisterValidator = t.Object({
  username: t.String(),
  firstname: t.String(),
  lastname: t.String(),
  status: t.String(),
  school: t.String(),
  classlvl: t.String()
})
