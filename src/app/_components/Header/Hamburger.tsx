'use client';

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'
import { useState, useRef } from 'react';
import * as motion from 'motion/react-client'
import Link from 'next/link'
import { Session } from 'next-auth';
import { AnimatePresence } from 'framer-motion';

export default function HamClient( { status }: any ) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-[2px] my-[3px] rounded-full bg-white transition ease transform duration-300`;
  const arrow = `w-2 h-[2px] bg-white transition ease transform duration-300`;
  const [showShows, setShowShows] = useState(false);
  const [showOther, setShowOther] = useState(false);

  interface NavEProps {
    href: string,
    text: string
  }
  const NavE:React.FC<NavEProps> = ({href, text}) => {
    return (
      <Link
          className={status === "unauthenticated" ? "hidden" : "text-left lext-white"}
          onClick={() => {
            setShowShows(false);
            setShowOther(false);
            setIsOpen(false);
          }}
          href={href}
        >
          <div className=" text-left pl-4 text-white py-2 text-lg">{text}</div>
        </Link>
    )
  }


  return (
    <section>
      <button
        ref={buttonRef}
        className="flex flex-col h-10 w-10 rounded justify-center items-start group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "rotate-45 translate-y-[3px] opacity-80 group-hover:opacity-100 w-6"
              : "opacity-100 group-hover:opacity-80 w-5"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "-rotate-45 -translate-y-[5px] opacity-80 group-hover:opacity-100 w-6"
              : "opacity-100 group-hover:opacity-80 w-4"
          }`}
        />
      </button>

      <div
        ref={navbarRef}
        className={
          isOpen
            ? "overflow-x-hidden absolute left-0 translate-x-0  z-10 w-full bg-[#2C1865] overflow-hidden  bg-opacity-80 top-16 duration-500 ease-out transition-all"
            : "absolute z-60 w-full bg-[#2C1865] overflow-hidden bg-opacity-80 top-16 translate-x-full duration-500 ease-out transition-all"
        }
      >
        <NavE href='/' text="หน้าแรก"/>
        <button
          className={
            showShows
              ? " text-left px-4 text-white py-2 text-lg w-full flex justify-between items-center bg-[#462A86] bg-opacity-80 transition-all  "
              : "text-left px-4 text-white py-2 text-lg w-full flex justify-between items-center transition-all"
          }
          onClick={() => {
            setShowShows(!showShows);
          }}
        >
          ตารางการแสดง
          <div className=" flex relative">
            <div
              className={`${arrow} ${
                showShows
                  ? " rounded-l-full absolute -left-[5px] top-0    "
                  : "rotate-45  absolute -left-[5px] top-0 rounded-l-full "
              }`}
            ></div>
            <div
              className={`${arrow} ${
                showShows ? " rounded-r-full   " : "-rotate-45  rounded-r-full "
              }`}
            ></div>
          </div>
        </button>
        {showShows && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0,
            }}
          >
            <Link
              className=" w-full "
              href="/theatre"
              onClick={() => {
                setShowShows(false);
                setShowOther(false);
                setIsOpen(false);
              }}
            >
              <div className=" text-left pl-8 text-white bg-[#462A86] bg-opacity-80 py-2 text-sm">
                หอประชุมฯ
              </div>
            </Link>
            <Link
              className=" w-full "
              href="/larn70"
              onClick={() => {
                setShowShows(false);
                setShowOther(false);
                setIsOpen(false);
              }}
            >
              <div className=" text-left pl-8 text-white bg-[#462A86] bg-opacity-80 py-2 text-sm">
                ลาน 70 ปีฯ
              </div>
            </Link>
          </motion.div>
        )}
            <NavE href='/inprogress' text="ตารางการแสดง"/>
            <NavE href='/directions' text="การเดินทางมาโรงเรียน"/>
            <NavE href='/map' text="แผนผังงาน"/>
        <div>
        {status === "unauthenticated" ? (
          <NavE href="auth" text="เข้าสู่ระบบ" />
        ) : (
          <NavE href="account" text="บัญชี" />
        )}
        </div>
      </div>
    </section>
  );
}

