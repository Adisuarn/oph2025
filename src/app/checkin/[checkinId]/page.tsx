import React from 'react';
import { redirect } from 'next/navigation'
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
};

export default function CheckIn({ params }: { params: { checkinId?: string } }) {
  if (!userData.isStaff) redirect('/')

  return (
    <section className='h-screen flex flex-col justify-center items-center'>
      <h1>Check In</h1>
      <p>Code ID: {params.checkinId || 'No ID provided'}</p>
      <div className='flex items-center justify-around w-28'>
        <button className='py-3 px-4 bg-blue-50 rounded-full'>Approve</button>
        <button className='py-3 px-4 bg-blue-50 rounded-full'>Reject</button>
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
  );
}
