import type { NextPage } from 'next';

import { auth } from '~/server/auth';
import { SignIn } from '~/app/_components/signIn';
import { SignOut } from '~/app/_components/signOut';
import { api } from '~/libs/elysia/server';

const Page: NextPage = async () => {
  const session = await auth()
  const { data } = await api.hello.index.get()
  return (
    <div>
      { session ? (
        <div>
          <h1>Authenticated</h1>
          <p>API response: {data}</p>
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
