import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '~/server/auth'
import RegisterForm from '~/app/_components/Register/RegisterForm'
import { redirect } from 'next/navigation'

const Register: React.FC = async () => {
  const session = await auth()
  if (!session || session.user.isRegister) redirect('/')
  return (
    <SessionProvider>
      <RegisterForm />
    </SessionProvider>
  )
}

export default Register
