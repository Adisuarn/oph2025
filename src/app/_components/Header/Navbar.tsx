'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Logo from '~/vectors/nav/logo'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import * as motion from 'motion/react-client'
import { useSession } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shadcn/dropdown-menu'
import Hamburger from './Hamburger'

const Navbar = () => {
  const { status } = useSession()
  console.log(status)

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

  function Reload() {
    location.reload()
  }

  const [isOpen, setIsOpen] = useState(false)
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
      <div
        className="flex h-full cursor-pointer items-center justify-between px-6"
      >
        <Link href="/" className="flex items-center justify-center space-x-4">
          <Logo className="w-16" />
          <div className="font-Inter  items-center text-lg text-white opacity-100 flex flex-col">
            <p className="text-md lg:text-2xl font-bold tracking-wider">TRIAM UDOM</p>
            <p className="text-sm lg:text-lg font-semibold">OPEN HOUSE 2025</p>
          </div>
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="underline">
            หน้าแรก
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="transition-all ease-in-out hover:translate-y-1">
              ตารางการแสดง
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="bg-greenText text-white">
                <Link href="larn70">ลาน 70 ปีฯ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="theatre">หอประชุมฯ</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="" className="hover:underline">
            แผนผังงาน
          </Link>
          <Link href="" className="hover:underline">
            การเดินทาง
          </Link>
          {status === 'unauthenticated' ? (
            <Link href="/auth" className="hover:underline">
              เข้าสู่ระบบ
            </Link>
          ) :
            status === 'authenticated' &&
            (
            <Link href="/e-ticket" className="hover:underline">
              บัญชี
            </Link>
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
