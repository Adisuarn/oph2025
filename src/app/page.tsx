import type { NextPage } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Contacts from '~/app/_components/Contacts'
import Countdown from '~/app/_components/Countdown'
import Nav from '~/app/_components/Header/Navbar'
import { auth } from '~/server/auth'
import Landing from '~/vectors/landing/Landing'
import MLanding1 from '~/vectors/landing/MLanding1'
import TUOPH from '~/vectors/landing/TUOPH'
import { AnimatePresence, easeIn } from 'framer-motion'
import * as motion from 'motion/react-client'

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
      <motion.section
        initial={{ opacity: 0.75, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 0.5, ease: 'easeInOut' },
          y: { type: 'spring', stiffness: 70, damping: 20 },
        }}
        className="relative top-0 -mt-20 flex min-h-screen w-screen flex-col items-center justify-between overflow-hidden bg-gradient-radial from-[#ECF5C8] to-[#6AB692] md:justify-around lg:justify-end"
      >
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:hidden">
          <Landing className="w-[100vw] md:h-[100vh]" />
        </div>
        <div className="absolute left-1/2 top-0 hidden min-h-screen w-full -translate-x-1/2 lg:block">
          <MLanding1 className="overflow-x-hidden object-cover lg:w-[100vw] xl:h-full xl:min-h-screen xl:w-full" />
        </div>
        <div className="absolute left-1/2 top-14 z-40 -translate-x-1/2 md:top-0 lg:top-[10%]">
          <TUOPH className="w-[95vw] md:w-[80vw]" />
        </div>
        <div className="md:hidden"></div>
        <div className="relative -top-2 flex flex-col items-center justify-center space-y-8 md:top-8 md:space-y-8 lg:-top-4 lg:mb-4 xl:space-y-10 2xl:mb-16 2xl:space-y-14">
          <div className="rounded-full bg-gradient-to-r from-[#E03C2E] to-[#F28041] px-10 py-3 font-semibold text-white shadow-2xl transition-all hover:scale-105 md:text-xl xl:py-4 xl:text-2xl 2xl:px-12 2xl:py-4 2xl:text-3xl">
            10-11 January 2025
          </div>
          <Countdown />
        </div>
        <div>
          <Contacts />
        </div>
      </motion.section>
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
      {/* {session && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center justify-around"></div>
                <Link href="/e-ticket" className="font-bold text-white">
                  Your E-Ticket
                </Link>
                <SignOut />
              </div>
            )} */}
    </>
  )
}

export default Page
