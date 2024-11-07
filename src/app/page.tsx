import type { NextPage } from 'next';

import { auth } from '~/server/auth';
import { SignIn } from '~/app/_components/signIn';
import { SignOut } from '~/app/_components/signOut';
import { api } from '~/libs/elysia/server';
import { redirect } from 'next/navigation';

const Page: NextPage = async () => {
  const session = await auth()
  return (
    <div>
      { session ? (
        <div>
          <h1>Authenticated</h1>
          <p>Email: {session.user.email}</p>
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
