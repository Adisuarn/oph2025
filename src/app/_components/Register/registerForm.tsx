'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { api } from '~/libs/elysia/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

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

  {
    /* Authentication */
  }
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const emailQuery = searchParams.get('email')

  if (status === 'loading')
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="loader"></div>
      </div>
    )
  if (status === 'unauthenticated') return <div>Unauthenticated</div>
  if (emailQuery !== session?.user?.email) {
    return <div>Bad Request</div>
  }

  {
    /* Formik */
  }
  const initialValues = {
    prefix: '',
    username: '',
    firstname: '',
    lastname: '',
    status: '',
    school: '',
    classlvl: '',
    purpose: [],
    platform: [],
  }

  const onSubmit = async (values: RegisterForm, { setSubmitting }: any) => {
    const id = toast.loading('Registering...')
    const { error } = await api.authentication.index.patch(values)
    if (error) {
      toast.update(id, {
        render: `${error.value}`,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      })
      setSubmitting(false)
      return
    }
    toast.update(id, {
      render: 'Registered Successfully',
      type: 'success',
      isLoading: false,
      autoClose: 2000,
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
    platform: Yup.array().required('Required'),
  })

  // use reuseable components here it will be better
  interface InputFieldProps {
    name: string
    label: string
    holder: string
  }

  const InputField: React.FC<InputFieldProps> = ({ label, name, holder }) => {
    return (
      <div>
        <label htmlFor="name">{label}</label>
        <div>
          <Field
            placeholder={holder}
            name={name}
            type="text"
            id={name}
            className="min-w-full rounded-md border"
          />
          <ErrorMessage name={name} className="text-red-400" component="div" />
        </div>
      </div>
    )
  }

  type SelectFieldProps = {
    label: string
    name: string
    options: { value: string; label: string }[]
  }

  const SelectField: React.FC<SelectFieldProps> = ({ label, name, options }) => {
    return (
      <div>
        <p>{label}</p>
        <p>ตอบได้มากกว่า 1 ข้อ</p>
        {options.map((option) => (
          <div key={option.value}>
            <label>
              <Field type="checkbox" name={name} value={option.value} />
              {option.label}
            </label>
          </div>
        ))}
        <ErrorMessage name={name} className="text-red-400" component="div" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div>This is Register Page</div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <Form className="flex min-w-[85%] flex-col space-y-4 md:min-w-[60%] lg:min-w-[50%]">
            <div className="flex flex-col items-start justify-center space-y-5">
              <InputField
                name="username"
                label="ชื่อผู้ใช้ (username)"
                holder="ความยาวไม่เกิน 22 ตัวอักษร"
              />
              <InputField
                name="firstname"
                label="ชื่อจริง (ไม่ต้องมีคำนำหน้า)"
                holder="เรียนเด่น"
              />
              <InputField name="lastname" label="นามสกุล" holder="เล่นดี" />
            </div>

            <div className="my-8 h-2 w-screen bg-greenText"></div>

            <div className="flex flex-col items-start justify-center space-y-5">
              <div>
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
              <InputField name="school" label="โรงเรียน" holder="โรงเรียนเตรียมอุดมศึกษา" />
              <InputField name="grade" label="ระดับชั้น" holder="ม.3" />
            </div>

            <div className="my-8 h-2 w-screen bg-greenText"></div>

            <SelectField
              label="ได้รับข่าวสารของ Triam Udom Open House 2025 จากที่ใดบ้าง"
              name="purpose"
              options={[
                { value: 'study', label: 'Study' },
                { value: 'research', label: 'Research' },
                { value: 'teaching', label: 'Teaching' },
                { value: 'other', label: 'Other' },
              ]}
            />

            <div className="my-8 h-2 w-screen bg-greenText"></div>

            <SelectField
              label="จุดประสงค์ในการเข้าร่วม Triam Udom Open House 2025"
              name="platform"
              options={[
                { value: 'study', label: 'Study' },
                { value: 'research', label: 'Research' },
                { value: 'teaching', label: 'Teaching' },
                { value: 'other', label: 'Other' },
              ]}
            />
            
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
