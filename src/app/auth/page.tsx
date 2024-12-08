import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { SignIn } from '~/app/_components/SignIn';
import { auth } from '~/server/auth';
import Brick from '~/vectors/auth/Brick'
import BrickSmall from '~/vectors/auth/BrickSmall'
import NiceStuff from '~/vectors/auth/NiceStuff'
import Window from '~/vectors/auth/Window'

const Page = async({ searchParams }: { searchParams: Promise<{ [key: string ]: string | undefined }>}) => {
  const session = await auth()
  if (session && session.user.isRegister) redirect('/e-ticket');
  if (session && !session.user.isRegister) redirect('/register?email=' + session?.user.email)

  const callbackUrl = (await searchParams).callbackUrl

  return (
    <main className="via-21% to-77% relative h-screen w-screen overflow-hidden bg-gradient-to-b from-[#6FB07C] via-[#4F8D78] to-[#072923] sm:z-0 sm:bg-gradient-to-br">
      <div className="absolute right-0 top-10 z-30 w-[110vw] lg:top-20 lg:w-[70vw] lg:-right-40">
        <Window className="h-[50vh] w-full md:h-[50vh] lg:h-[75vh]" />
      </div>
      <div className="absolute bottom-0">
        <Brick className="hidden lg:block lg:h-[30vh] lg:w-screen" />
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
        <BrickSmall className="h-[55vh] lg:hidden" />
      </div>
      <div className="flex h-[90vh] flex-col items-center justify-end text-center lg:flex lg:h-full lg:items-start lg:justify-center lg:pl-16 xl:pl-32">
        <div className="relative z-20 items-center space-y-4 sm:flex sm:flex-col sm:justify-center top-8 md:top-0">
          <div className="-mt-28 flex flex-col">
            <p className="bg-gradient-to-br from-[#ADDB64] from-10% to-[#ECF5C8] bg-clip-text text-6xl font-bold leading-normal text-transparent sm:leading-loose md:text-8xl md:leading-extra-loose">
              Register
            </p>
            <div className="-mb-12 -mt-12 flex items-center justify-center space-x-3 md:-mt-32">
              <NiceStuff className="h-28 w-32 sm:h-32 sm:w-36" />
              <p className="from-24% bg-gradient-to-br from-greenishCream to-[#ADDB64] bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                ลงทะเบียน
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="from-24% bg-gradient-to-b from-greenishCream to-[#ADDB64] bg-clip-text text-4xl font-bold text-transparent">
              กช.
            </p>
            <div className="mx-3 h-6 w-[2px] rounded-full bg-greenishCream sm:h-6 md:h-8"></div>
            <div className="from-24% flex flex-col bg-gradient-to-bl from-greenishCream to-[#ADDB64] bg-clip-text text-xs font-bold text-transparent">
              <p>งานกิจกรรมพัฒนาผู้เรียน</p>
              <p>โรงเรียนเตรียมอุดมศึกษา</p>
            </div>
          </div>
          <div className="relative z-50 flex flex-col space-y-4 justify-center items-center">
            <SignIn callbackUrl={callbackUrl} />
            <div className="text-xs font-medium text-white md:text-sm">
              การลงทะเบียนถือว่ายอมรับ
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="from-24% bg-gradient-to-b from-greenishCream to-[#ADDB64] bg-clip-text text-transparent underline decoration-[#ADDB64]"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
              <br />
              และ
              <Link
                href="/tos"
                target="_blank"
                rel="noopener noreferrer"
                className="from-24% bg-gradient-to-b from-greenishCream to-[#ADDB64] bg-clip-text text-transparent underline decoration-[#ADDB64]"
              >
                ข้อตกลงการใช้งาน
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
    
  )
}

export default Page
