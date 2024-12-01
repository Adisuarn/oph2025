import Link from 'next/link'
import React from 'react'
import { auth } from '~/server/auth'
import { QRCodeSVG } from 'qrcode.react'

// BIG BIG BIG Head Line make sure to design from phone first
const page = async () => {
  const session = await auth()
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className='py-5 px-8 rounded-xl bg-blue-50 space-y-2'>
      <p>{session?.user.email}</p>
      <div>Hello {session?.user.firstname} {session?.user.lastname}</div>
      <div>Log in code : {session?.user.code}</div>
      <QRCodeSVG
      className='rounded-xl transition-all'
        value={'https://openhouse.triamudom.ac.th/checkin/' + session?.user.code}
        title={'Triam Udom Open House 2025 E-Ticket'}
        size={128}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'M'}
        includeMargin={true}
        imageSettings={{
          src: 'favicon.ico',
          x: undefined,
          y: undefined,
          height: 24,
          width: 24,
          opacity: 1,
          excavate: true,
        }}
      />
      <Link href="/">Home</Link>
      <Link href={`checkin/${session?.user.code}`} className='ml-4'>STAFF Check in</Link>
      </div>
    </section>
  )
}

export default page
