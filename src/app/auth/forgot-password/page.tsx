'use client';

import { ReactNode, useState } from 'react';
import Button from '@/components/buttons/Button';
import TextInput from '@/components/input/TextInput';
import { Gilroy, GilroyMedium } from '@/fonts/font';
import { useForgotPasswordMutation } from '@/redux/reducers/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as Types from '@/types/types';
import { AuthHeader } from '@/components/typography/AuthHeader';
import { toast } from 'react-toastify';
import Link from 'next/link';

type Response = {
  data: {
    data: null;
    message: string;
    success: boolean;
  };
};

export const EmailSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('A valid email is required'),
});

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`
              ${Gilroy.variable} h-screen
              overflow-hidden lg:flex justify-center items-center
          `}
    >
      <div
        className='
                  w-[100%] lg:w-[50%]  
                  p-4
                  md:flex md:justify-center lg:justify-end
                  lg:px-24 lg:pb-0
                  max-h-full
                  overflow-y-scroll hide-scroll-bar
                  '
      >
        <div className='md:max-w-[500px] w-[100%]'>
          <AuthHeader title='Forgot Password' className='text-center mb-10' />
          <ForgotPassword />
        </div>
      </div>
      <div
        className={`
                  w-[100%] lg:w-[50%]  
                  lg:block hidden 
                  min-h-[100vh]
                  bg-[url('/assets/login-bg.svg')]
                  bg-no-repeat
                  bg-cover
              `}
      ></div>
    </div>
  );
};

const ForgotPassword = ({ onFinish }: { onFinish?: () => void }) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const onForgotPassword = async (email: Types.ForgotPassword) => {
    try {
      const res: unknown = await forgotPassword(email);
      const responseData = res as Response;
      if (responseData?.data?.success) {
        setLinkSent(true);
        setMessage(responseData?.data?.message);
        toast.success('Reset link sent!', { theme: 'colored' });

        if (onFinish) {
          onFinish();
        }
      } else {
        toast.error('Failed to send reset link.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const { handleBlur, handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: EmailSchema,
    onSubmit: (values) => {
      if (!isLoading) {
        onForgotPassword(values);
      }
    },
  });

  return (
    <div>
      {!linkSent ? (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
          <div className={`${Gilroy.className}`}>
            <div>
              <TextInput
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type='text'
                placeholder='Email address'
                errors={errors?.email}
                extraClass='!ring-[1.5px]'
              />
            </div>
          </div>

                  
          <div className='mt-6'>
            <Button
              loading={isLoading}
              spinColor='#ffffff'
              type='submit'
              label='Send Reset Link'
              additionalClass='!py-4'
            />
          </div>
        </form>
      ) : (
        <div className='lg:mt-6'>
          <div className={`${Gilroy.className} mt-4 text-center`}>
            {message}.
          </div>
        </div>
      )}
    </div>
  );
};

export default Wrapper;
