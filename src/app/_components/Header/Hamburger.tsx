'use client'

import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
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
        // className="w-full"
        href={href}
      >
        <div className="py-2 pl-4 text-left text-lg text-white active:underline active:bg-[#0E544B]">{text}</div>
      </Link>
    )
  }

  useEffect(() => {
    setShowOther(false);
    setShowShows(false);

    const detectOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isNavbarClicked =
        isOpen && navbarRef.current && !navbarRef.current.contains(target);
      const isButtonClicked =
        buttonRef.current && buttonRef.current.contains(target);

      if (isNavbarClicked && !isButtonClicked) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("mousedown", detectOutside);

    return () => {
      document.body.removeEventListener("mousedown", detectOutside);
    };
  }, [isOpen]);

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

      <AnimatePresence>
      {isOpen && (
          <motion.div
            ref={navbarRef}
            className="absolute left-0 top-20 w-full overflow-hidden bg-[#1A8B6D] bg-opacity-80"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <NavE href="/" text="หน้าแรก" />
            <div className='flex justify-between items-center w-full'
            onClick={() => setShowShows(!showShows)}
            >
              <NavE href="/inprogress" text="ตารางการแสดง" />
              <div className="relative flex mr-8">
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
                  className='bg-[#0E544B] bg-opacity-60 pl-4'
                >
                  <NavE href="/theatre" text="หอประชุมฯ" />
                  <NavE href="/larn70" text="ลาน 70 ปีฯ" />
                </motion.div>
              )}
            </AnimatePresence>
            <NavE href="/maps" text="แผนผังงาน" />
            <NavE href="/directions" text="การเดินทางมาโรงเรียน" />
              {status === 'unauthenticated' ? (
                <NavE href="auth" text="เข้าสู่ระบบ" />
              ) : (
                <NavE href="account" text="บัญชี" />
              )}
          </motion.div>
      )}
      </AnimatePresence>
    </section>
  )
}
