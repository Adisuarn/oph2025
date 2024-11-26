import type { NextPage } from 'next';

import { auth } from '~/server/auth';
import { SignIn } from '~/app/_components/signIn';
import { SignOut } from '~/app/_components/signOut';
import Link from 'next/link';

const Page: NextPage = async () => {
  const session = await auth()
  return (
    <div>
      {session ? (
        <div>
          <h1>Authenticated</h1>
          <p>Is registered {session.user.isRegister ? 'true' : 'false'}</p>
          <p>Email: {session.user.email}</p>
          {session.user.isRegister ? (
            <>
              <p>Registered !!</p>
              <p>FirstName: {session.user.firstname}</p>
              <p>LastName: {session.user.lastname}</p>
            </>
          ) : (
            <Link href={'/register?email=' + session?.user.email}>
              Go To Register
            </Link>
          )}
          <SignOut />
        </div>
      ) : (
        <div>
          <h1>Not authenticated</h1>
          <SignIn />
        </div>
      )}
    </div>
  )
}

export default Page
