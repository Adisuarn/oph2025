import { signOut } from '~/server/auth'

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button
        type="submit"
        className="relative px-4 py-2 font-semibold text-zinc-400 underline hover:text-zinc-600 transition-colors"
      >
        Sign Out
      </button>
    </form>
  )
}
