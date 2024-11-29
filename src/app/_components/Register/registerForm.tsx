'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useSession } from "next-auth/react"
import { toastify, ToastType } from '~/app/utils/toastify'
import { api } from '~/libs/elysia/react';
import { useRouter } from 'next/navigation';

interface RegisterForm {
  username: string
  firstname: string
  lastname: string
  status: string
  school: string
  classlvl: string
}

export default function RegisterForm() {

  const router = useRouter()

  const [step, setStep] = useState(1)
  const [progessPercentage, setProgressPercentage] = useState(0)

  { /* Step Function */ }
  const totalStep = 2

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    setProgressPercentage((step) / (totalStep) * 100)
  }, [step])

  { /* Authentication */}
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const emailQuery = searchParams.get('email')
  
  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') return <div>Unauthenticated</div>
  if (emailQuery !== session?.user?.email) {
    return <div>Bad Request</div>
  }

 {/* Formik Initialize*/}
  const initialValues = {
    username: '',
    firstname: '',
    lastname: '',
    status: '',
    school: '',
    classlvl: ''
  }

  const onSubmit = async (values: RegisterForm, { setSubmitting }: any) => {
    try {
      setSubmitting(true)
      const { status } = await api.authentication.index.patch(values)
      if (status === 200) {
        toastify(
          'Register Success',
          ToastType.SUCCESS
        )
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        toastify(
          'Register Failed',
          ToastType.ERROR
        )
      }
    } catch (error) {
      console.error(error)
      toastify(
        'Server Error',
        ToastType.ERROR
      )
      setSubmitting(false)
    } finally {
      setSubmitting(false)
    }
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    school: Yup.string().required('Required'),
    classlvl: Yup.string().required('Required')
  })
  
  { /* Return Section */}
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>This is Register Page</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <main className="min-w-[90%] border p-3 flex flex-col items-center rounded-lg md:min-w-[80%] lg:min-w-[60%]">
          <Form className="border min-w-[85%] md:min-w-[60%] lg:min-w-[50%]">

            { /* Progress Pie Circle For Mobile*/}
            <div className="flex items-center justify-center md:hidden">
              <svg width="96" height="96" viewBox="0 0 128 128" className="relative w-24 h-24">
                {/* Background circle (remaining progress) */}
                <circle
                  cx="64"
                  cy="64"
                  r="48" 
                  stroke="#D1D5DB"
                  strokeWidth="12" 
                  fill="none"
                />

                {/* Foreground circle (progress) */}
                <circle
                  cx="64"
                  cy="64"
                  r="48"
                  stroke="#34D399"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="301.593"
                  strokeDashoffset={301.593 - (301.593 * progessPercentage) / 100} 
                  style={{
                    transition: "stroke-dashoffset 1s ease-out", 
                    transformOrigin: "50% 50%",
                    transform: "rotate(-90deg)", 
                  }}
                />

                {/* Centered Circle (inner white circle) */}
                <circle
                  cx="64"
                  cy="64"
                  r="40"
                  fill="white"
                />

                {/* Step Text */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#4B5563"
                >
                  {step} / {totalStep}
                </text>
              </svg>

              <p className="mt-2 text-sm font-medium text-gray-500">
                {step === 1 ? 'Person Information' : 'Status'}
              </p>
            </div>

            <div className="hidden md:flex md:items-center md:justify-around md:mb-6 relative">
              {/* Connecting Line */}
              <div className="absolute top-4 left-[41%] right-[31%] h-0.5 bg-gray-300 md:left-[34%] md:right-[31%] lg:left-[34%] lg:right-[32%]">
                {/* Progress Overlay */}
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${step > 1 ? '100%' : '0%'}` }}
                />
              </div>

              {/* Step 1 Circle */}
              <div className="flex flex-col items-center z-10">
                <div className={`transition-all duration-300 w-8 h-8 rounded-full border-2 flex items-center justify-center ${step === 1 ? 'text-black border-orange-500' :
                  step > 1
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-500 border-gray-300'
                  }`}>
                  1
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">Information</p>
              </div>

              {/* Step 2 Circle */}
              <div className="flex flex-col items-center z-10">
                <div className={`transition-all duration-300 w-8 h-8 rounded-full border-2 flex items-center justify-center ${step === 2 ? 'text-black border-orange-500' :
                  step > 2
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-500 border-gray-300'
                  }`}>
                  2
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">Status</p>
              </div>
            </div>

            { /* Step 1 */ }
            {step === 1 && (
              <>
                <div className="mt-3">
                  <label>Username</label>
                  <div>
                    <Field name="username" type="text" className="border rounded-md min-w-full" />
                    <ErrorMessage name="username" className="text-red-400" component="div" />
                  </div>
                </div>

                <div className="mt-3">
                  <label>Firstname</label>
                  <div>
                    <Field name="firstname" type="text" className="border rounded-md min-w-full" />
                    <ErrorMessage name="firstname" className="text-red-400" component="div" />
                  </div>
                </div>

                <div className="mt-3">
                  <label>Lastname</label>
                  <div>
                    <Field name="lastname" type="text" className="border rounded-md min-w-full" />
                    <ErrorMessage name="lastname" className="text-red-400" component="div" />
                  </div>
                </div>

                <div className="mt-3">
                  <label>School</label>
                  <div>
                    <Field name="school" type="text" className="border rounded-md min-w-full" />
                    <ErrorMessage name="school" className="text-red-400" component="div" />
                  </div>
                </div>

                <div className="mt-3">
                  <label>Level</label>
                  <div>
                    <Field name="classlvl" as="select" className="border">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Field>
                  </div>
                </div>
                
                <button type="button" className="mt-3" onClick={nextStep}>
                  Next
                </button>
              </>
            )}

            { /* Step 2 */ }
            {step === 2 && (
              <>
                <div className="mt-3">
                  <label>Status</label>
                  <div>
                    <label>
                      <Field type="radio" name="status" value="student" />
                      Student
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field type="radio" name="status" value="teacher" />
                      Teacher
                    </label>
                  </div>
                </div>
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <div className="mt-3">
                  <button type="submit">Submit</button>
                </div>
              </>
            )}

            { /* Back to HomePage */ }
            <div className="mt-3">
              <Link href={'/'}>
                HomePage
              </Link>
            </div>
          </Form>
        </main>
      </Formik>
      
    </div>
  )
}
