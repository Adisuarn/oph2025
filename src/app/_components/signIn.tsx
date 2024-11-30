import { signIn } from "~/server/auth"

export function SignIn(){
  return (
    <form
      action={async() => {
        'use server'
        await signIn("google")
      }}
    >
      <button type="submit" className="px-4 py-3 bg-blue-50 text-black rounded-full hover:bg-white hover:scale-110 transition-all">ลงทะเบียน</button>
    </form>
  )
}
