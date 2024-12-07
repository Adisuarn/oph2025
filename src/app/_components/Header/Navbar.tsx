'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import * as motion from "motion/react-client"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from '../ui/dropdown-menu'
import Hamburger from './Hamburger'

const Navbar = () => {
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

  const [isOpen, setIsOpen] = useState(false)
  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="sticky top-0 z-50 h-16 w-screen bg-blue-600 text-white opacity-80"
    >
      <div className="flex h-full items-center justify-between px-6">
        <div className="text-lg font-bold">Logo</div>
        <nav
          className="hidden space-x-6 md:flex"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Link href="/" className="hover:underline">
            หน้าแรก
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>การแสดง</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel><Link href="/e-ticket">e-ticket</Link></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="" className="hover:underline">
            ตารางการแสดง
          </Link>
          <Link href="" className="hover:underline">
            การเดินทาง
          </Link>
          <Link href="" className="hover:underline">
            ข้อมูลเพิ่มเติม
          </Link>
        </nav>
        <div className="md:hidden">
          <Hamburger />
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar
