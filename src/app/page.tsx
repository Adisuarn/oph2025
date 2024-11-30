import type { NextPage } from 'next'
import Link from 'next/link'
import Countdown from '~/app/_components/Countdown'
import Nav from '~/app/_components/Header/Nav'
import { SignIn } from '~/app/_components/signIn'
import { SignOut } from '~/app/_components/signOut'
import { auth } from '~/server/auth'
import { motion } from 'framer-motion'
import Contacts from '~/app/_components/Contacts'
import { Redirect } from 'next'

const Page = async () => {
  const session = await auth()

  return (
    <section>
      {/* <Nav /> */}
                
      <section className="flex h-screen flex-col items-center justify-center bg-zinc-400 space-y-4">
        <p className='text-2xl'><span className='font-bold'>T</span>riam <span className='font-bold'>U</span>dom</p>
        <p className='text-xl'>OPEN HOUSE</p>
        <p>10-11 January 2025</p>
        <Countdown />
        {session ? <div>It's great to have you {session.user.username}</div> : <Link href='/auth'>ลงทะเบียน</Link>}
          <div>
          <p>Stay Tuned</p>
          <Contacts />
        </div>
        {session && (
          <SignOut />
      )}
      </section>
    </section>
  )
}

export default Page
