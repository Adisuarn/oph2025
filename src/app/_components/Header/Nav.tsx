'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import Hamburger from './Hamburger';

const Nav = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous! && latest > window.innerHeight * 0.2) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
    variants={{
      visible: { y: 0 },
      hidden: { y: "-100%" },
    }}
    animate={hidden ? "hidden" : "visible"}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className="w-screen h-16 sticky top-0 bg-blue-600 opacity-80 text-white"
  >
    <div className="flex items-center justify-between px-6 h-full">
      <div className="text-lg font-bold">Logo</div>
      <nav className="space-x-6 hidden md:flex" 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}>
        <Link href="/" className="hover:underline">
          หน้าแรก
        </Link>
        <Link href="" className="hover:underline">
          แผนผังงาน drop down
        </Link>
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
      <div className='md:hidden'>
        <Hamburger />
      </div>
    </div>
  </motion.div>
  )
}

export default Nav