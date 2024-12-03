'use client'
import React, { use } from 'react';
import { redirect } from 'next/navigation'
import { auth } from '~/server/auth'
import { Formik } from 'formik';

export default async function CheckIn(props: { params: Promise<{ checkinId?: string }> }) {
  const session = await auth()
  const params = use(props.params);
  if (!session?.user.isStaff) redirect('/');

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <h1>Staff: {session.user.firstname} {session.user.lastname}</h1>

      {/* <p>Code ID: {params.checkinId || 'No ID provided'}</p>
      <div className="flex w-28 items-center justify-around">
        <button className="rounded-full bg-blue-50 px-4 py-3">Approve</button>
        <button className="rounded-full bg-blue-50 px-4 py-3">Reject</button>
      </div> */}

    </section>
  )
}
