import { signIn } from "~/server/auth"
import Google from '~/vectors/auth/Google'


export function SignIn(){
  return (
    <form
      action={async() => {
        'use server'
        await signIn("google")
      }}
    >
    <button className="to-72% relatvie z-20 flex items-center justify-center space-x-3 rounded-full bg-gradient-to-b from-white to-white px-3 py-3 shadow-xl hover:opacity-75 sm:px-5 md:px-14 md:py-5 md:text-xl"
    >
      <Google className="h-4 w-4 md:h-6 md:w-6" />
      <p className="text-sm text-greenText opacity-85 md:text-2xl">
        Sign up with Google
      </p>
    </button>
    </form>
  )
}
