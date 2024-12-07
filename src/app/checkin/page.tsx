import React from 'react';
import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'
import ModeToggle from '~/components/ModeToggle';
import StaffForm from '~/components/Staff/StaffForm'; 

export default async function CheckIn({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }>}) {
  const session = await auth()
  //if (!session?.user.isStaff) redirect('/');
  const code = (await searchParams).code
  return (
    <main className="flex flex-col h-screen items-center justify-center">

      <section className="relative border rounded-xl w-[70%] h-[50%] flex flex-col items-center py-7 md:h-[35%] lg:w-[40%] lg:h-[40%]">
        <div className="absolute bottom-3 right-3 md:top-3 md:right-3">
          <ModeToggle />
        </div>
        <h1 className="font-Thai font-bold text-2xl">ระบบลงทะเบียนเข้างาน</h1>
        <h1 className="text-base mt-3">Staff: {session?.user.firstname} {session?.user.lastname}</h1>
        <div className="flex h-[70%] mt-5">
          <StaffForm code={code} />
        </div>
      </section>
    </main>
  )
}
