'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { api } from '~/libs/elysia/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Link from 'next/link'

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
        <label htmlFor={name}>{label}</label>
        <div>
          <Field
            placeholder={holder}
            name={name}
            type="text"
            id={name}
            className="min-w-full rounded-md border py-1 pl-2 pr-2"
          />
          <ErrorMessage name={name} className="text-red-400" component="div" />
        </div>
      </div>
    )
  }

  interface RadioFieldProps {
    name: string
    options: { value: string; label: string }[]
  }

  const RadioField: React.FC<RadioFieldProps> = ({ name, options }) => {
    return (
      <div>
        {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
          <Field type="radio" name={name} value={option.value} className="peer hidden" />
          <div className="border-gray-400 h-6 w-6 rounded-full border-2 peer-checked:border-red-500 peer-checked:bg-blue-700"></div>
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
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
          <label key={option.value} className="flex cursor-pointer items-center space-x-2">
            <Field
              type="checkbox"
              name={name}
              value={option.value}
              className="border-gray-400 h-5 w-5 rounded text-red-500 focus:bg-black focus:ring-2 focus:ring-red-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
        <ErrorMessage name={name} className="text-red-400" component="div" />
      </div>
    )
  }

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <div>ลงทะเบียน</div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <div className="flex flex-col items-center justify-center bg-blue-50 px-4 py-2">
            <Form className="flex w-[50vw] flex-col items-start justify-center">
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

              <div className="my-8 h-2 w-full bg-greenText"></div>

              <div className="flex flex-col items-start justify-center space-y-5">
                <p>สถานภาพ</p>
                <RadioField name='status' options={[
                  { label: 'นักเรียน', value: 'student' },
                  { label: 'ผู้ปกครอง', value: 'parents' },
                  { label: 'ครู / บุคลากรโรงเรียน', value: 'teachers' },
                  { label: 'อื่น ๆ', value: 'Rothers'}
                ]}/>
                <InputField name="school" label="โรงเรียน" holder="โรงเรียนเตรียมอุดมศึกษา" />
                <InputField name="classlvl" label="ระดับชั้น" holder="ม.3" />
              </div>

              <div className="my-8 h-2 w-full bg-greenText"></div>

              <SelectField
                label="ได้รับข่าวสารของ Triam Udom Open House 2025 จากที่ใดบ้าง"
                name="purpose"
                options={[
                  { label: 'Facebook Page: Triam Udom Open House', value: 'FB' },
                  { label: 'Instagam: @triamudom.oph / @tucmc_official', value: 'IG' },
                  { label: 'X: @triamudomoph', value: 'X' },
                  { label: 'TikTok: @triamudom.oph', value: 'TikTok' },
                  { label: 'เพจ studygram', value: 'studygram' },
                  { label: 'นักเรียนโรงเรียนเตรียม ฯ', value: 'student' },
                  { label: 'เพื่อน', value: 'friends' },
                  { label: 'ผู้ปกครอง', value: 'parents' },
                  { label: 'โรงเรียน', value: 'school' },
                ]}
              />

              <div className="my-8 h-2 w-full bg-greenText"></div>

              <SelectField
                label="จุดประสงค์ในการเข้าร่วม Triam Udom Open House 2025"
                name="platform"
                options={[
                  { label: 'หาข้อมูลการสอบเข้าโรงเรียนเตรียมอุดมศึกษา', value: 'admission' },
                  { label: 'เข้าชมซุ้มกิจกรรม และ กิจกรรมการแสดง', value: 'participation' },
                  {
                    label: 'หาข้อมูลเกี่ยวกับโรงเรียนเตรียมฯ เพื่อประกอบการตัดสินใจ',
                    value: 'info',
                  },
                  {
                    label: 'หาแรงบันดาลใจในการสอบเข้าโรงเรียนเตรียมอุดมศึกษา',
                    value: 'inspiration',
                  },
                  { label: 'ชมบรรยากาศโรงเรียนเตรียมอุดมศึกษา', value: 'observation' },
                  { label: 'อื่น ๆ โปรดระบุ:', value: 'others' },
                ]}
              />
            </Form>
            <div className='flex flex-col justify-center items-center'>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <div className="text-xs font-medium text-black md:text-sm">
              การลงทะเบียนถือว่ายอมรับ
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F8EB78] underline"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
              <br />
              และ
              <Link
                href="/tos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F8EB78] underline"
              >
                ข้อตกลงการใช้งาน
              </Link>
            </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
