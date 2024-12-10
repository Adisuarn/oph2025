import React from "react";
import { Facebook } from "~/vectors/icons/Facebook";
import { X } from "~/vectors/icons/X";
import { Youtube } from "~/vectors/icons/Youtube";
import { Instagram } from "~/vectors/icons/Instagram";
import { Tiktok } from "~/vectors/icons/Tiktok";
import { motion } from 'framer-motion'
import Link from "next/link";
import KorChor from "~/vectors/icons/korchor";
import SignButton from "./SignButton";
import { auth } from '~/server/auth'

const Footer = async ({ theme }: { theme?: string }) => {
  const session = await auth()
  return (
    <footer
      className={`w-full px-8 pt-10 antialiased bg-[#2C1865] ${theme === "light" ? "bg-white" : "bg-blue-text"
        }`}
    >
      <div className="flex flex-col items-center justify-between w-full max-w-6xl px-0 mx-auto md:flex-row md:items-start md:px-20">
        <div className="flex justify-center">
          <div className="space-y-5 text-center md:text-left">
            <div
              className={`${theme === "light" ? "text-[#37498B]" : "text-white"
                } font-semibold font-sans`}
            >
              <p>TRIAM UDOM</p>
              <p className="-mt-1">OPEN HOUSE 2024</p>
            </div>
            <div className="flex space-x-3">
              <Link href="https://www.facebook.com/TriamUdomOPH" className="hover:scale-105" target="_blank">
                <Facebook />
              </Link>
              <Link href="https://www.instagram.com/triamudom.oph/" className="hover:scale-105" target="_blank">
                <Instagram />
              </Link>
              <Link href="https://x.com/triamudomoph" className="hover:scale-105" target="_blank">
                <X />
              </Link>
              <Link href="https://www.youtube.com/c/TriamUdomOpenHouse" className="hover:scale-105" target="_blank">
                <Youtube />
              </Link>
              <Link href="https://www.tiktok.com/@triamudom.oph" className="hover:scale-105" target="_blank">
                <Tiktok />
              </Link>
            </div>
            <SignButton session={session ? session : null} />
          </div>
        </div>
        <div
          className={`${theme === "light" ? "text-deep-turquoise" : "text-white"
            } flex flex-col sm:flex-row justify-between w-full max-w-md ml-0 mt-6 sm:mt-0 md:ml-28`}
        >
          <div className="flex flex-col space-y-2 text-center md:text-right max-md:mt-5 font-display">
            <Link href="/">
              <p className="hover:underline">หน้าแรก</p>
            </Link>
            <Link href="/clubs">
              <p className="hover:underline">ชมรม</p>
            </Link>
            {session && (
              <Link href="/e-ticket">
                <p className="hover:underline">E-ticket</p>
              </Link>
            )}
          </div>
          <div className="flex flex-col space-y-2 text-center md:text-right max-md:mt-5 font-display">
            <Link href="/admission">
              <p className="hover:underline">การสอบเข้า</p>
            </Link>
            <Link href="/directions">
              <p className="hover:underline">การเดินทาง</p>
            </Link>
            <Link href="/contact">
              <p className="hover:underline">ติดต่อ</p>
            </Link>
            <Link href="/map">
              <p className="hover:underline">แผนผังงาน</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-5 mt-10 border-t border-[#CBD5E0] border-opacity-30">
        <KorChor
          classname="h-4 lg:h-8"
          fill={theme === "light" ? "" : "#FDF1DB"}
        />
      </div>
    </footer>
  );
};

export default Footer
