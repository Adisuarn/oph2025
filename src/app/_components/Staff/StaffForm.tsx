'use client'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { api } from '~/libs/elysia/react'
import { toast } from 'react-toastify'

const StaffForm = ({ code }: any) => {

  const initialValues = {
    code: code || ''
  }

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    //console.log(await api.staff({ day: '1'})({ code: values.code}).post())

    const id = toast.loading('Code Submitting...')
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
        {({ isSubmitting }) => (
          <Form>
            <Field name="code" type="text" placeholder="Please provide code" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default StaffForm
