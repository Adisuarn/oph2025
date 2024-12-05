import React from 'react';
import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'
import StaffForm from '~/app/_components/Staff/StaffForm'; 

export default async function CheckIn({ params }: any) {
  const session = await auth()
  //if (!session?.user.isStaff) redirect('/');
  const { code } = await params
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <h1>Staff: {session?.user.firstname} {session?.user.lastname}</h1>
      <p>{code}</p>
      <StaffForm code={code} />

    </section>
  )
}
