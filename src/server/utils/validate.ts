import { t } from 'elysia'

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function UnionField(fields: string[], errorMsg: string, required: boolean = true) {
  return required
    ? t.Union(
      fields.map((field) => t.Literal(field)),
      {
        error() {
          return errorMsg
        },
      },
    )
    : t.Optional(
      t.Union(
        fields.map((field) => t.Literal(field)),
        {
          error() {
            return errorMsg
          },
        },
      ),
    )
}
