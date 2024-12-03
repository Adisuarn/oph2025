"use client"
import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react';
import Link from 'next/link'

const SignButton = ({ session }: any) => {
  if (!session) {
    return (
      <Link passHref href="/auth">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="inline-flex px-8 py-2 text-white font-bold rounded-full bg-gradient-to-r from-[#FFD995] via-[#FF7ADA] to-[#4B69E9] mt-5 font-regular font-display footer-button"
        >
          เข้าสู่ระบบ
        </motion.button>
      </Link>
    );
  } else {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => signOut()}
        className="inline-flex px-8 py-2 text-white font-bold rounded-full bg-gradient-to-r from-[#FFD995] via-[#FF7ADA] to-[#4B69E9] mt-5 font-regular font-display footer-button"
      >
        ออกจากระบบ
      </motion.button>
    );
  }
};

export default SignButton
