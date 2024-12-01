import { t } from 'elysia'

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function StringField(required: boolean = true, errorMsg: string, format?: string) {
  return required
    ? t.String({
      error() {
        return errorMsg
      },
      format: format,
    })
    : t.Optional(
      t.String({
        error() {
          return errorMsg
        },
        format: format,
      }),
    )
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
