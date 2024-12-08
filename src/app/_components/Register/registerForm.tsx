'use client'
import React from 'react'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify'
import { api } from '~/libs/elysia/react';

interface RegisterForm {
  prefix: string
  username: string
  firstname: string
  lastname: string
  status: string
  school: string
  classlvl: string
  purpose: string[]
  platform: string[]
}

export default function RegisterForm() {

  const router = useRouter()

  { /* Authentication */ }
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const emailQuery = searchParams.get('email')

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') return <div>Unauthenticated</div>
  if (emailQuery !== session?.user?.email) {
    return <div>Bad Request</div>
  }

  { /* Formik */ }
  const initialValues = {
    prefix: '',
    username: '',
    firstname: '',
    lastname: '',
    status: '',
    school: '',
    classlvl: '',
    purpose: [],
    platform: []
  }

  const onSubmit = async (values: RegisterForm, { setSubmitting }: any) => {
    const id = toast.loading('Registering...')
    const { error } = await api.authentication.index.patch(values)
    if (error) {
      toast.update(id, {
        render: `${error.value}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      })
      setSubmitting(false)
      return
    }
    toast.update(id, {
      render: 'Registered Successfully',
      type: 'success',
      isLoading: false,
      autoClose: 2000
    })
    router.push('/')
    setSubmitting(false)
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    school: Yup.string().required('Required'),
    classlvl: Yup.string().required('Required'),
    purpose: Yup.array().required('Required'),
    platform: Yup.array().required('Required')
  })

  // questions
  // Figma Openhouse or die
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>This is Register Page</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="border min-w-[85%] md:min-w-[60%] lg:min-w-[50%]">

            <div className="mt-3">
              <label>Prefix</label>
              <div>
                <label>
                  <Field type="radio" name="prefix" value="male" />
                  Male
                </label>
              </div>
              <div>
                <label>
                  <Field type="radio" name="prefix" value="female" />
                  Female
                </label>
              </div>
              <ErrorMessage name="prefix" className="text-red-400" component="div" />
            </div>

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
                <ErrorMessage name="classlvl" className="text-red-400" component="div" />
              </div>
            </div>

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
              <ErrorMessage name="status" className="text-red-400" component="div" />
            </div>
            <div>
              <label>Purpose</label>
              <div>
                <label>
                  <Field type="checkbox" name="purpose" value="learning" />
                  Learning
                </label>
              </div>
              <div>
                <label>
                  <Field type="checkbox" name="purpose" value="teaching" />
                  Teaching
                </label>
              </div>
              <ErrorMessage name="purpose" className="text-red-400" component="div" />
            </div>

            <div>
              <label>Platform</label>
              <div>
                <label>
                  <Field type="checkbox" name="platform" value="web" />
                  Web
                </label>
              </div>
              <div>
                <label>
                  <Field type="checkbox" name="platform" value="mobile" />
                  Mobile
                </label>
              </div>
              <ErrorMessage name="platform" className="text-red-400" component="div" />
            </div>

            <div className="mt-3">
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
