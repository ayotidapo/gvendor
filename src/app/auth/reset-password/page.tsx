'use client';
import { ReactNode } from 'react';
import Button from '@/components/buttons/Button';
import TextInput from '@/components/input/TextInput';
import { Gilroy, GilroyMedium } from '@/fonts/font';
import { useResetPasswordMutation } from '@/redux/reducers/auth/authSlice';
import { useFormik } from 'formik';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { AuthHeader } from '@/components/typography/AuthHeader';
import Link from 'next/link';

const ResetPasswordSchema = Yup.object({
  password: Yup.string().required('Please enter your new password'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please repeat your new password'),
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
          <AuthHeader title='Reset Password' className='text-center mb-10' />
          {children}
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

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onResetPassword = async (val: { password: string }) => {
    const email = searchParams.get('email');
    const code = searchParams.get('code');
    if (code && email) {
      try {
        const payload = {
          email,
          code,
          password: val.password,
        };
        const response = await resetPassword(payload);
        const responseData = response as { data: { success: boolean } };

        if (responseData?.data?.success) {
          toast.success('Password reset successfully', { theme: 'colored' });
          router.replace('/auth/login');
        }
      } catch (error) {
        toast.error('Failed to reset password. Please try again.');
      }
    }
  };

  const { handleBlur, handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      if (!isLoading) {
        onResetPassword(values);
      }
    },
  });

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
        <div className={`${Gilroy.className}`}>
          <div>
            <TextInput
              id='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
              placeholder='Enter new password'
              errors={errors?.password}
              extraClass='!ring-[1.5px]'
            />
          </div>
        </div>

        <div className={`${Gilroy.className}`}>
          <div>
            <TextInput
              id='repeatPassword'
              name='repeatPassword'
              value={values.repeatPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
              placeholder='Repeat password'
              errors={errors?.repeatPassword}
              extraClass='!ring-[1.5px]'
            />
          </div>
        </div>

        <Button
          loading={isLoading}
          spinColor='#ffffff'
          type='submit'
          label='Reset Password'
          additionalClass='!py-4'
        />
      </form>

      <div className={`mt-2 text-md text-center ${GilroyMedium.className}`}>
        <Link
          href={'/auth/login'}
          className='hover:underline transition-all duration-500'
        >
          Back to login
        </Link>
      </div>
    </Wrapper>
  );
};

export default ResetPassword;
