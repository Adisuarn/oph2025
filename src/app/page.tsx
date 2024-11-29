import type { NextPage } from 'next'
import Link from 'next/link'
import Countdown from '~/app/_components/Countdown'
import Nav from '~/app/_components/Header/Nav'
import { SignIn } from '~/app/_components/signIn'
import { SignOut } from '~/app/_components/signOut'
import { auth } from '~/server/auth'
import { motion } from 'framer-motion'

const Page = async () => {
  const session = await auth()

  return (
    <section>
      {/* <Nav /> */}
      {/* {session ? (
         <div className="flex h-screen flex-col items-center justify-around">
           <div className="flex flex-col items-center justify-center">
           <h1 className="font-bold">Authenticated</h1>
            <p>Is registered {session.user.isRegister ? 'true' : 'false'}</p>
             <p>Email: {session.user.email}</p>
             {session.user.isRegister ? (
               <div className="flex flex-col items-center justify-center">
                 <p>Registered !!</p>
                 <p>First name: {session.user.firstname}</p>
                 <p>Last name: {session.user.lastname}</p>
                 <p>Your Code: {session.user.code}</p>
                 <Link href="/e-ticket">Your E-Ticket {}</Link>
               </div>
             ) : (
               <Link
                 href={'/register?email=' + session?.user.email}
                 className="rounded-full bg-blue-50 px-3 py-4 transition-all ease-in-out hover:scale-105 hover:bg-blue-500 hover:text-white"
               >
                 Go To Register
               </Link>
             )}
             <SignOut />
           </div>
         </div>
       ) : (
         <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-emerald-200">
         <p>
             <span className="text-bold">T</span>riam
             <span className="text-bold">U</span>dom
           </p>
           <p>OPEN HOUSE</p>
           <p>22-23 January 2023</p>
           <SignIn />
           <Countdown />
         </div>
       )} */}
      <section className="flex h-screen flex-col items-center justify-center space-y-4 bg-emerald-200">
        <p className='text-2xl'><span className='font-bold'>T</span>riam <span className='font-bold'>U</span>dom</p>
        <p className='text-xl'>OPEN HOUSE</p>
        <p>10-11 January 2025</p>
        {session ? <div>It's great to have you {session.user.username}</div> : <SignIn />}
        <Countdown />
      </section>
    </section>
  )
}

export default Page
