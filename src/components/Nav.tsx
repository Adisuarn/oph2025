'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

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
      <nav className="flex space-x-6">
        <a href="#home" className="hover:underline">
          Home
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
      </nav>
    </div>
  </motion.div>
  )
}

export default Nav