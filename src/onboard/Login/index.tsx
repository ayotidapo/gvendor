'use client';

import { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/input/Input';
import { signInUser } from '@/redux/apis/setAuth';
import { loginApi } from '@/redux/apis/vendor';
import { setVendor } from '@/redux/reducers/vendor';
import { Login } from '@/types/types';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector, useDispatch } from '@/redux/hooks';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const LoginSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('A valid email is required'),
	password: Yup.string().required('Please enter your password'),
});

const LoginPage: React.FC = ({}) => {
	const [submitting, setSubmitting] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();

	const onLogin = async (values: Record<string, any>) => {
		try {
			setSubmitting(true);
			const response = await loginApi(values);
			const { user = {}, token = '' } = response?.data;
			dispatch(setVendor({ ...user }));
			localStorage.t_ = response?.data?.token;
			await signInUser({ goodToken: token, vendorId: user?._id });
		} catch (e: any) {
		} finally {
			setSubmitting(false);
		}
	};

	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LoginSchema,
		onSubmit: values => {
			onLogin(values);
		},
	});

	return (
		<form onSubmit={handleSubmit} className='w-[420px]'>
			<h2 className='auth_h2'>Welcome Back</h2>
			<div>
				<Input
					{...getFieldProps('email')}
					error={touched.email ? errors.email : ''}
					type='text'
					placeholder='Email address'
				/>

				<Input
					{...getFieldProps('password')}
					error={touched.password ? errors.password : ''}
					type='password'
					placeholder='Password'
				/>
			</div>

			<div className={` text-md cursor-pointer `}>
				<Link
					href={'/auth/forgot-password'}
					className='hover:underline transition-all duration-500'
				>
					{' '}
					Forgot your password?
				</Link>
			</div>

			<div className='mt-6'>
				<SimpleBtn disabled={submitting}>Sign in</SimpleBtn>
			</div>
			<p className='text-black pt-5 text-center'>
				New to good?{' '}
				<Link
					href='/auth/register-business'
					className='text-[#f45d2c] subpixel-antialiased'
				>
					Register your business
				</Link>
			</p>
		</form>
	);
};

export default LoginPage;
