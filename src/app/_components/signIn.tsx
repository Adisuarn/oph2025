import { signIn } from "~/server/auth"

export function SignIn(){
  return (
    <form
      action={async() => {
        'use server'
        await signIn("google")
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  )
}
