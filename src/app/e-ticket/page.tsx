import Link from 'next/link'
import React from 'react'
import { auth } from '~/server/auth'
import { QRCodeSVG } from 'qrcode.react'

// BIG BIG BIG Head Line make sure to design from phone first
const page = async () => {
  const session = await auth()
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <div>{session?.user.firstname}</div>
      <div>{session?.user.lastname}</div>
      <div>{session?.user.level}</div>
      <div>{session?.user.school}</div>

      <Link href="/">SVG Back Arrow or text Home</Link>

      <QRCodeSVG
        value={'https://picturesofpeoplescanningqrcodes.tumblr.com/'}
        title={'Triam Udom Open House 2025 E-Ticket'}
        size={128}
        bgColor={'#ffffff'}
        fgColor={'#000000'}
        level={'M'}
        imageSettings={{
          src: 'https://static.zpao.com/favicon.png',
          x: undefined,
          y: undefined,
          height: 24,
          width: 24,
          opacity: 1,
          excavate: true,
        }}
      />
    </section>
  )
}

export default page
