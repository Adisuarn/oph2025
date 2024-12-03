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
import { motion } from 'framer-motion'

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

      <section>
        {/* <Nav /> */}

        <section className="flex h-screen flex-col items-center justify-center space-y-4 bg-zinc-400">
          <p className="text-2xl">
            <span className="font-bold">T</span>riam <span className="font-bold">U</span>dom
          </p>
          <p className="text-xl">OPEN HOUSE</p>
          <p>10-11 January 2025</p>
          <Countdown />
          {session ? (
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
          </div>
          <div>
            <p>Stay Tuned</p>
            <Contacts />
            {session && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center justify-around"></div>
                <Link href="/e-ticket" className="font-bold text-white">
                  Your E-Ticket
                </Link>
                <SignOut />
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  )
}

export default Page
