import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '~/server/auth'
import { redirect } from 'next/navigation'
import RegisterForm from '~/app/_components/Register/RegisterForm'

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
