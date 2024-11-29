import { Gates } from "~/server/utils"
import { t } from 'elysia'

export interface IStaff {
  organization?: string,
  tag?: string,
  gate: Gates
}

export const RegStaffValidator = t.Object({
  organization: t.Optional(t.String()),
  tag: t.Optional(t.String()),
  gate: t.Enum(Gates)
})
