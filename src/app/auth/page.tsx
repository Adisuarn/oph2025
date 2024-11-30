import React from 'react'
import { SignIn } from '~/app/_components/signIn'
import { Redirect } from 'next'

const page = () => {
  return (
    <section className='h-screen flex justify-center items-center bg-black text-white'>
        <div className='flex flex-col justify-center items-center'>
            <SignIn />
        </div>
    </section>
  )
}

export default page