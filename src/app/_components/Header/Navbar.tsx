'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Logo from '~/vectors/nav/logo'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import * as motion from 'motion/react-client'
import { useSession } from 'next-auth/react'

import Hamburger from './Hamburger'

const Navbar = () => {
  const { status } = useSession()
  console.log(status)
  const [shows, setShows] = useState(false)

  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous! && latest > window.innerHeight * 0.2) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })
  const pathname = usePathname()

  interface NavBroProps {
    name: string
    url: string
  }

  const NavBro: React.FC<NavBroProps> = ({ name, url }) => {
    return (
      <div className={`group relative inline-block cursor-pointer ${name == "ลงทะเบียน" && "bg-greenishCream text-greenText hover:bg-opacity-70 shadow-lg px-4 py-2 rounded-3xl transition-all"}`}>
        <Link href={url} className={pathname.startsWith(url) ? 'text-lg font-bold' : ''}>
          {name}
        </Link>
        {name !== "ลงทะเบียน" && (<span className="absolute bottom-0 left-2 h-[2px] w-0 rounded-full bg-greenishCream transition-all duration-300 group-hover:w-[80%]"></span>)}
     </div>
    )
  }
  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="sticky top-0 z-50 h-20 w-screen bg-gradient-to-r from-[#1A8B6D] to-[#0E544B] text-white"
    >
      <div className="flex h-full cursor-pointer items-center justify-between px-16">
        <Link href="/" className="flex items-center justify-center space-x-4">
          <Logo className="w-16" />
          <div className="flex flex-col items-center font-Inter text-lg text-white opacity-100">
            <p className="text-md font-bold tracking-wider lg:text-2xl">TRIAM UDOM</p>
            <p className="text-sm font-semibold lg:text-lg">OPEN HOUSE 2025</p>
          </div>
        </Link>

        <nav className="hidden md:flex md:items-center md:justify-around md:w-[50vw]">
          <NavBro name="หน้าแรก" url="/" />
          <div
            className={`group relative inline-block ${
              pathname.startsWith('/larn70') || pathname.startsWith('/theatre')
                ? 'font-semibold underline'
                : ''
            } `}
            onMouseOver={() => setShows(true)}
            onClick={() => setShows(true)}
            onMouseLeave={() => setShows(false)}
          >
            <span>ตารางการแสดง</span>
            <AnimatePresence>
              {shows && (
                <motion.div
                  key={'dropdown'}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -bottom-[5rem] -left-4 z-20 flex w-36 cursor-pointer flex-col items-center justify-center rounded-xl bg-greenText bg-opacity-70"
                >
                  <Link href="/theatre" className="cursor-pointer py-2 hover:bg-opacity-100">
                    หอประชุมฯ
                  </Link>
                  <div className="h-[2px] w-full bg-gradient-to-r from-greenishCream to-greenText"></div>
                  <Link href="/larn70" className="py-2 hover:bg-opacity-100">
                    ลาน 70 ปีฯ
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavBro name="แผนผังงาน" url="/maps" />
          <NavBro name="การเดินทางมาโรงเรียน" url="/direction" />
          {status === 'unauthenticated' ? (
            <NavBro name="ลงทะเบียน" url="/register" />
          ) : (
            status === 'authenticated' && <NavBro name="บัญชี" url="/e-ticket" />
          )}
        </nav>
        <div className="md:hidden">
          <Hamburger status={status} />
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar
