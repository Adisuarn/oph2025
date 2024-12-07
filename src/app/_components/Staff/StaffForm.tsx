'use client';
import React from 'react';
import { useCallback } from 'react';
import { Button } from '~/shadcn/button';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { api } from '~/libs/elysia/react';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { AiFillCloseCircle } from "react-icons/ai";
import Link from 'next/link';
import * as Yup from 'yup';
import classNames from 'classnames';

const StaffForm = ({ code }: { code?: string }) => {

  const initialValues = { code: code || '' };

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const validateCode = useCallback(
    debounce(async (value: string, callback: (isValid: boolean) => void) => {
      if (!value || value.length !== 5) return callback(false);
      try {
        const { error } = await api.staff.checkcode({ code: value }).get();
        callback(!error);
      } catch {
        callback(false);
      }
    }, 500),
    []
  );

  const validationSchema = Yup.object({
    code: Yup.string()
      .required('กรุณากรอกรหัสเข้างาน')
      .length(5, 'กรุณากรอกให้ครบ 5 ตัวอักษร')
      .test(
        'check-code',
        'รหัสนี้ไม่มีอยู่ในระบบ',
        (value) =>
          new Promise((resolve) => {
            validateCode(value || '', resolve);
          })
      ),
  });

  const handleSubmit = async (values: { code: string }, { setSubmitting }: FormikHelpers<{ code: string }>) => {
    const toastId = toast.loading('Code Submitting...');
    try {
      const { error } = await api.staff.confirmcode({ day: '1' })({ code: values.code }).post();
      toast.update(toastId, {
        render: error ? error.value : 'ยืนยันรหัสเข้างานเรียบร้อย',
        type: error ? 'error' : 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch {
      toast.update(toastId, {
        render: 'เกิดข้อผิดพลาดที่เซิฟเวอร์',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {({ isSubmitting, errors, values, isValid, isValidating }) => {

          const isButtonDisabled = !values.code || isSubmitting || !isValid || isValidating;

          return (
            <Form className="flex flex-col h-full justify-center text-center">
              <Field
                name="code"
                type="text"
                maxLength={5}
                autoComplete="off"
                spellCheck="false"
                placeholder="รหัสเข้างาน"
                className="border rounded-md mt-3 py-2 px-1 placeholder:text-center"
              />

              {errors.code && <div className="text-red-400 text-sm mt-1">{errors.code}</div>}

              <Button
                type="submit"
                variant="outline"
                disabled={isButtonDisabled}
                className={classNames(
                  'mt-5 border',
                  isButtonDisabled && 'cursor-not-allowed opacity-50',
                  isSubmitting ? ' border-yellow-400 text-yellow-600' : '',
                  isValidating 
                    ? 'border-yellow-400 text-yellow-600'
                    : errors.code ? ' border-red-400 text-red-500'
                      : 'hover:bg-green-200 border-green-400 hover:text-green-800 transition-colors duration-200'
                )}
              >
                {isSubmitting &&
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Submitting...
                  </>
                }
                {isValidating &&
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Validating...
                  </>
                }
                {!isSubmitting && !errors.code && !isValidating && 'Submit'}
                {!isSubmitting && errors.code && !isValidating && <AiFillCloseCircle />}
              </Button>

              <Button
                asChild
                variant="link"
                disabled={isSubmitting}
                className={classNames('mt-5', isSubmitting && 'cursor-not-allowed')}
              >
                <Link href="/">กลับหน้าหลัก</Link>
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default StaffForm;
