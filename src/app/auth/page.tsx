import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { SignIn } from '~/app/_components/signIn';
import { auth } from '~/server/auth';


const Page = async () => {
  const session = await auth();

  if (session) {
    redirect('/register?email=' + session?.user.email);
  }

  return (
    <section className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center justify-center">
        <SignIn />
      </div>
      <div className="mt-6 text-xs font-medium text-white md:text-sm">
        การลงทะเบียนถือว่ายอมรับ
        <Link
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF9DE9] underline"
        >
          นโยบายความเป็นส่วนตัว
        </Link>
        <br />
        และ
        <Link
          href="/tos"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF9DE9] underline"
        >
          ข้อตกลงการใช้งาน
        </Link>
      </div>
    </section>
  );
};

export default Page;
