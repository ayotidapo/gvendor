'use client';

import { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/Input/Input';

import { forgotPasswordApi } from '@/redux/apis/vendor';

import { useFormik } from 'formik';

import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Link from 'next/link';
import { useState } from 'react';

const ForgotPaswordPageSchema = Yup.object({
	email: Yup.string()
		.email('Enter valid email address')
		.required('Email is Required'),
});

const ForgotPaswordPage = () => {
	const [sentLink, setSentLink] = useState(false);
	const [loading, setLoading] = useState(false);
	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: ForgotPaswordPageSchema,
		onSubmit: async values => {
			try {
				setLoading(true);
				const { email } = values;
				await forgotPasswordApi({
					email,
				});
				setSentLink(true);
			} catch (e: any) {
				toast.error(e?.message || 'Something went wrong');
			} finally {
				setLoading(false);
			}
		},
	});

	if (sentLink)
		return (
			<div className='auth__form text-center'>
				<h2 className='auth_h2'> Forgot password</h2>
				<p>
					If we find the email in our system, we will send you an email with a
					link to reset your password. If you do not receive the email, check
					your spam folder or try password reset using a different email
					address.
				</p>
				<p className='text-black pt-5 text-center'>
					New to Good?{' '}
					<Link
						href='/auth/register'
						className='text-[#f45d2c] subpixel-antialiased'
					>
						Create an account
					</Link>
				</p>
			</div>
		);

	return (
		<form onSubmit={handleSubmit} className='auth__form'>
			<h2 className='auth_h2'>Forgot password</h2>
			<div>
				<Input
					{...getFieldProps('email')}
					error={touched.email ? errors.email : ''}
					type='text'
					placeholder='Enter email address'
				/>
			</div>

			<div className='mt-6'>
				<SimpleBtn disabled={loading}>Get Link</SimpleBtn>
			</div>
			<p className='text-black pt-5 text-center'>
				Remeber your password?{' '}
				<Link
					href='/auth/login'
					className='text-[#f45d2c] subpixel-antialiased'
				>
					Sign in
				</Link>
			</p>
		</form>
	);
};

export default ForgotPaswordPage;
