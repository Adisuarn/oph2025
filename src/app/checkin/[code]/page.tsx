import React from 'react';
import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'
import StaffForm from '~/components/Staff/StaffForm'; 

export default async function CheckIn({ params }: any) {
  const session = await auth()
  //if (!session?.user.isStaff) redirect('/');
  const { code } = await params
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <section className="border rounded-xl w-[70%] h-[50%] flex flex-col items-center py-5">
        <h1 className="font-Thai font-bold text-2xl">ระบบลงทะเบียนเข้างาน</h1>
        <h1>Staff: {session?.user.firstname} {session?.user.lastname}</h1>
        <div className="flex h-[50%] border mt-5">
          <StaffForm code={code} />
        </div>
      </section>
    </main>
  )
}
