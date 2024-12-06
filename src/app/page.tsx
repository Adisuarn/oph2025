import type { NextPage } from 'next'
import { Redirect } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Contacts from '~/app/_components/Contacts'
import Countdown from '~/app/_components/Countdown'
import Nav from '~/app/_components/Header/Navbar'
import { SignIn } from '~/app/_components/signIn'
import { SignOut } from '~/app/_components/signOut'
import { auth } from '~/server/auth'
import TUOPH from '~/vectors/landing/TUOPH'
import { motion } from 'framer-motion'
import Landing from '~/vectors/landing/Landing'
import MLanding1 from '~/vectors/landing/MLanding1'

const Page = async () => {
  const session = await auth()

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-7FPZZ1EY5V`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7FPZZ1EY5V');
          `,
        }}
      />
      <section className="relative flex h-screen flex-col items-center justify-between md:justify-around lg:justify-end space-y-8 bg-gradient-radial from-[#ECF5C8] to-[#6AB692] overflow-hidden">
        <div className='absolute -translate-x-1/2 left-1/2 lg:hidden -bottom-4'>
          <Landing className='w-[100vw] md:h-[100vh]'/>
        </div>
        <div className='hidden lg:block absolute left-1/2 -translate-x-1/2 lg:-top-4 xl:-top-14 overflow-hidden'>
          <MLanding1 className='lg:w-[105vw] xl:w-[110vw] lg:h-[110vh]'/>
        </div>
        <div className='-top-4 md:-top-4 lg:top-[10%] left-1/2 -translate-x-1/2 absolute z-40'>
          <TUOPH className='w-[95vw] lg:w-[80vw]' />
        </div>
        <div className='md:hidden'></div>
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-8 relative xl:space-y-10 2xl:space-y-14 xl:mb-8 -top-8 md:top-8 lg:-top-4">
          <div className="md:text-xl xl:text-2xl rounded-full bg-gradient-to-r from-[#E03C2E] to-[#F28041] px-8 py-2 xl:py-4 font-semibold text-white shadow-2xl transition-all hover:scale-105">
            10-11 January 2025
          </div>
          <Countdown />
        </div>
        {/* {session ? (
            <div>
              It's great to have you <span className="font-bold">{session.user.username}</span>
            </div>
          ) : (
            <Link href="/auth">ลงทะเบียน</Link>
          )}
          <div className="flex space-x-4">
            <Link href="/organizations/TUSC">kor nor</Link>
            <Link href="/programs/arts-german">Deutschland</Link>
            <Link href="/gifted/gifted-english">GE</Link>
            <Link href="/clubs">clubs</Link>
          </div> */}
        <div>
          <Contacts />
          {/* {session && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center justify-around"></div>
                <Link href="/e-ticket" className="font-bold text-white">
                  Your E-Ticket
                </Link>
                <SignOut />
              </div>
            )} */}
        </div>
      </section>
    </>
  )
}

export default Page
