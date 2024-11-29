'use client'
import { redirect } from 'next/navigation'
import React, { useEffect, useState, use } from 'react';

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"

const userData = {
  isStaff: true,
  username: 'Cristiano Ronaldo',
}

export default function CheckIn(props: { params: Promise<{ checkinId?: string }> }) {
  const params = use(props.params);
  if (!userData.isStaff) redirect('/')

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <h1>Staff: {userData.username}</h1>

      <p>Code ID: {params.checkinId || 'No ID provided'}</p>
      <div className="flex w-28 items-center justify-around">
        <button className="rounded-full bg-blue-50 px-4 py-3">Approve</button>
        <button className="rounded-full bg-blue-50 px-4 py-3">Reject</button>
        {/* <AlertDialog>
      <AlertDialogTrigger className="font-bold w-full text-center">Test Confirmation</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center items-center">
        <AlertDialogHeader className="py-20 px-10">
          <AlertDialogTitle className="text-blue-400">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter >
          <AlertDialogCancel className="hover:bg-red-100">Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> */}
      </div>
    </section>
  )
}
