'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { api } from '~/libs/elysia/react'
import { toast } from 'react-toastify'
import { Button } from '~/shadcn/button'
import { Loader2 } from 'lucide-react'
import * as Yup from 'yup'

const StaffForm = ({ code }: any) => {

  // const today = new Date()
  // const day = today.toISOString().split('T')[0] === '2025-01-10' ? "1"
  //   : today.toISOString().split('T')[0] === '2025-01-11' ? "2"
  //     : 'Invalid'

  const initialValues = {
    code: code || ''
  }

  const onSubmit = async (values: { code: string }, { setSubmitting }: any) => {
    const id = toast.loading('Code Submitting...')
    //const { error } = await api.staff({ day: day })({ code: values.code }).post()
    const { error } = await api.staff({ day: '1' })({ code: values.code }).post()
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
      render: 'Code Submitted',
      type: 'success',
      isLoading: false,
      autoClose: 2000
    })
    setSubmitting(false)
  }

  const validationSchema = Yup.object({
    code: Yup.string().required('Required')
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col h-full justify-center text-center">
            <label>กรุณากรอกรหัสเข้างาน</label>
            <Field name="code" type="text" className="border " placeholder="Please provide code" />
            <ErrorMessage name="code" className="text-red-400" component="div" />
            <Button
              type="submit"
              disabled={!values.code}
              className={`${!values.code ? 'cursor-not-allowed' : ''} mt-5`}
            >
              {isSubmitting
                ? <>
                  <Loader2 className="animate-spin" />
                  Submitting...
                  </>
                : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default StaffForm
