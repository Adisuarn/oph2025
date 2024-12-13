'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import * as motion from 'motion/react-client'

export default function HamClient({ status }: any) {
  const navbarRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const genericHamburgerLine = `h-[2px] my-[3px] rounded-full bg-white transition ease transform duration-300`
  const arrow = `w-2 h-[2px] bg-white transition ease transform duration-300`
  const [showShows, setShowShows] = useState(false)
  const [showOther, setShowOther] = useState(false)

  interface NavEProps {
    href: string
    text: string
  }
  const NavE: React.FC<NavEProps> = ({ href, text }) => {
    return (
      <Link
        className="w-full hover:"
        onClick={() => {
          setShowShows(false)
          setShowOther(false)
          setIsOpen(false)
        }}
        href={href}
      >
        <div className="py-2 pl-4 text-left text-lg text-white">{text}</div>
      </Link>
    )
  }

  return (
    <section>
      <button
        ref={buttonRef}
        className="group flex h-10 w-10 flex-col items-start justify-center rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? 'w-6 translate-y-[3px] rotate-45 opacity-80 group-hover:opacity-100'
              : 'w-5 opacity-100 group-hover:opacity-80'
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? 'w-6 -translate-y-[5px] -rotate-45 opacity-80 group-hover:opacity-100'
              : 'w-4 opacity-100 group-hover:opacity-80'
          }`}
        />
      </button>

      {isOpen && (
        <AnimatePresence>
          <motion.div
            ref={navbarRef}
            className="absolute left-0 top-20 w-full overflow-hidden bg-green-500 bg-opacity-80"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <NavE href="/" text="หน้าแรก" />
            <div className='flex justify-around items-center w-full'>
              <NavE href="/inprogress" text="ตารางการแสดง" />
              <div className="relative flex">
                <div
                  className={`${arrow} ${
                    showShows
                      ? 'absolute -left-[5px] top-0 rounded-l-full'
                      : 'absolute -left-[5px] top-0 rotate-45 rounded-l-full'
                  }`}
                ></div>
                <div
                  className={`${arrow} ${showShows ? 'rounded-r-full' : '-rotate-45 rounded-r-full'}`}
                ></div>
              </div>
            </div>
            <AnimatePresence>
              {showShows && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0,
                  }}
                >
                  <NavE href="/theatre" text="หอประชุมฯ" />
                  <NavE href="/larn70" text="ลาน 70 ปีฯ" />
                </motion.div>
              )}
            </AnimatePresence>
            <NavE href="/directions" text="การเดินทางมาโรงเรียน" />
            <NavE href="/map" text="แผนผังงาน" />
              {status === 'unauthenticated' ? (
                <NavE href="auth" text="เข้าสู่ระบบ" />
              ) : (
                <NavE href="account" text="บัญชี" />
              )}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  )
}
