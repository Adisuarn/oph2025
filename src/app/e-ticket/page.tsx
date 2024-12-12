import Link from 'next/link'
import React from 'react'
import { auth } from '~/server/auth'
import { redirect } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { getBaseUrl } from '~/libs/utils'
import DownloadTicket from '~/app/_components/DownloadTicket'

// BIG BIG BIG Head Line make sure to design from phone first
const page = async () => {
  const session = await auth()

  if (!session) redirect('/');
  if (!session.user.isRegister) redirect('/register?email=' + session.user.email);

  const { code, email, firstname, lastname } = session.user
  
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className='py-5 px-8 rounded-xl bg-blue-50 space-y-2'>
        <p>{email}</p>
        <div>Hello {firstname} {lastname}</div>
        <div>Log in code : {code}</div>
        <QRCodeSVG
          className='rounded-xl transition-all'
          value={getBaseUrl() + '/checkin?code=' + code}
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
        <div>
          <DownloadTicket code={code} />
        </div>
        <Link href="/">Home</Link>
        <Link href={`checkin?code=${code}`} className='ml-4'>STAFF Check in</Link>
      </div>
    </section>
  )
}

export default page
