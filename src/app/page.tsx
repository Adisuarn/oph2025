
import type { NextPage } from 'next';

import { auth } from '~/server/auth';
import { SignIn } from '~/app/_components/signIn';
import { SignOut } from '~/app/_components/signOut';
import Link from 'next/link';
import Nav from '~/components/Nav';


const Page: NextPage = async () => {
  const session = await auth()
  return (
    <div>
      <Nav />
      {session ? (
        <div className='h-screen flex flex-col justify-around items-center'>
          <div className='flex flex-col justify-center items-center'>
          <h1 className='font-bold'>Authenticated</h1>
          <p>Is registered {session.user.isRegister ? 'true' : 'false'}</p>
          <p>Email: {session.user.email}</p>
          {session.user.isRegister ? (
            <div className='flex flex-col justify-center items-center'>
              <p>Registered !!</p>
              <p>First name: {session.user.firstname}</p>
              <p>Last name: {session.user.lastname}</p>
              <p>Your Code: {session.user.code}</p>
              <Link href="/e-ticket">Your E-Ticket {}</Link>
            </div>
          ) : (
            <Link href={'/register?email=' + session?.user.email} className='bg-blue-50 py-4 px-3 rounded-full hover:bg-blue-500 hover:scale-105 hover:text-white ease-in-out transition-all'>
              Go To Register
            </Link>
          )}
          <SignOut />
          </div>
          <div className='flex items-center space-x-4'>
            <Link href='/programs'>สายการเรียน</Link>
            <Link href='/programs'>โครงการพัฒนาความสามารถพิเศษ</Link>
            <Link href='/programs'>ชมรม</Link>
            <Link href='/programs'>องค์กร</Link>
          </div>
        </div>
      ) : (
        <div className='h-screen bg-blue-200 flex flex-col justify-center items-center space-y-4'>
          <div className='flex items-center space-x-2'><p className='text-red-500'>Not Authenticated</p> <div className='size-3 bg-red-500 rounded-full'></div></div>
          <SignIn />
        </div>
      )}
    </div>
  )
}

export default Page
