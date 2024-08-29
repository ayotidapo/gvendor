'use client';
import { ReactNode } from 'react';
import Button from '@/components/buttons/Button';
import TextInput from '@/components/input/TextInput';
import CheckboxInput from '@/components/common/Checkbox';
import { AuthHeader } from '@/components/typography/AuthHeader';
import { Gilroy } from '@/fonts/font';
import { useSignupMutation } from '@/redux/reducers/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';

const SignUpSchema = Yup.object({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
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
          <AuthHeader title='Sign Up' className='text-center mb-10' />
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

const SignUp = () => {
  const [signup, { isLoading }] = useSignupMutation();

  const onSignUp = async (values: any) => {
    try {
      const response = await signup(values);
      const responseData = response as { data: { success: boolean } };
      if (responseData?.data?.success) {
        toast.success('Signup successful', { theme: 'colored' });
        // Handle further navigation or state update
      }
    } catch (error) {
      toast.error('Failed to sign up. Please try again.');
    }
  };

  const { handleBlur, handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      phoneNumber: '',
      enableEmailNotifications: true,
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      if (!isLoading) {
        onSignUp(values);
      }
    },
  });

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
        <div className='flex gap-4'>
          <TextInput
            id='firstname'
            name='firstname'
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            type='text'
            placeholder='First Name'
            errors={errors?.firstname}
            extraClass='!ring-[1.5px]'
          />
          <TextInput
            id='lastname'
            name='lastname'
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            type='text'
            placeholder='Last Name'
            errors={errors?.lastname}
            extraClass='!ring-[1.5px]'
          />
        </div>

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

        <TextInput
          id='phoneNumber'
          name='phoneNumber'
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          type='text'
          placeholder='Phone Number'
          errors={errors?.phoneNumber}
          extraClass='!ring-[1.5px]'
        />

        <TextInput
          id='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type='password'
          placeholder='Password'
          errors={errors?.password}
          extraClass='!ring-[1.5px]'
        />

        <div className='ext-xs cursor-pointer'>
          <CheckboxInput
            label='Sign up for email notifications'
            type='checkbox'
            name='enableEmailNotifications'
            checked={values.enableEmailNotifications}
            onChange={handleChange}
          />
        </div>

        <Button
          loading={isLoading}
          spinColor='#ffffff'
          type='submit'
          label='Sign Up'
          additionalClass='!py-4'
        />
      </form>

      <div className={`mt-2 text-md text-center ${Gilroy.className}`}>
        <Link
          href={'/auth/login'}
          className='hover:underline transition-all duration-500'
        >
          Already have an account? Log in
        </Link>
      </div>
    </Wrapper>
  );
};

export default SignUp;
