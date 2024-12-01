import { Gates } from "~/server/utils"
import { t } from 'elysia'
import { StringField } from "~/server/utils"

export interface IStaffData {
  organization?: string,
  tag?: string,
  gate: Gates
}

export interface IStaffInfo {
  email: string,
  firstname: string,
  lastname: string,
  staff: {
    organization: string | null,
    tag: string | null,
    gate: Gates | string | null
  }
}

export const RegStaffValidator = t.Object({
  email: StringField(true, 'Invalid Email', "email"),
  organization: StringField(false, 'Invalid Organization'),
  tag: StringField(false, 'Invalid Tag'),
  gate: t.Enum(Gates)
})
