'use client';

import Button, { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/input/Input';
import { Gilroy, GilroyMedium } from '@/fonts/font';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { updateUserWithAuth } from '@/redux/reducers/auth/auth.reducer';
import { useLoginMutation } from '@/redux/reducers/auth/authSlice';
import { AuthResponse, Login } from '@/types/types';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
import GetBack from '../GetBack';

const LoginSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('A valid email is required'),
	password: Yup.string().required('Please enter your password'),
});

const LoginPage = () => {
	// const [login, { isLoading }] = useLoginMutation();
	// const dispatch = useAppDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();

	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LoginSchema,
		onSubmit: values => {
			// if (!isLoading) {
			// 	onLogin(values);
			// }
		},
	});

	const onLogin = async (credentials: Login) => {
		//try {
		//const res: unknown = await login(credentials);
		//const userAuthData = res as AuthResponse;
		//if (userAuthData?.data?.user) {
		//dispatch(updateUserWithAuth(userAuthData));
		toast.success('Login successful', { theme: 'colored' });
		const redirect = searchParams.get('redirect');
		router.push(redirect || '/');
		//	}
		// } catch (error) {
		// 	return error;
		// }
	};

	const [value, setValue] = useState<any>();

	console.log(value);
	return (
		<>
			<form onSubmit={handleSubmit}>
				<h2 className='auth_h2'>Register your business with Good!</h2>
				<div>
					<div className='combine_input wrapper'>
						<Input
							{...getFieldProps('email')}
							errors={touched.email ? errors.email : ''}
							type='text'
							placeholder='Email address'
						/>
						<Input
							{...getFieldProps('email')}
							errors={touched.email ? errors.email : ''}
							type='text'
							placeholder='Email address'
						/>
					</div>
					<Input
						{...getFieldProps('email')}
						errors={touched.email ? errors.email : ''}
						type='text'
						placeholder='Email address'
					/>

					<Input
						{...getFieldProps('password')}
						errors={touched.password ? errors.password : ''}
						type='password'
						placeholder='Password'
					/>
					<PhoneInput
						placeholder='Enter phone number'
						defaultCountry='NG'
						value={value}
						onChange={x => setValue(x)}
						international
						className='err'
					/>

					<Input
						{...getFieldProps('password')}
						errors={touched.password ? errors.password : ''}
						type='password'
						placeholder='Password'
					/>
					<Input
						{...getFieldProps('password')}
						errors={touched.password ? errors.password : ''}
						type='password'
						placeholder='Password'
					/>
					<Input
						{...getFieldProps('password')}
						errors={touched.password ? errors.password : ''}
						type='password'
						placeholder='Password'
					/>
				</div>

				<div className='mt-6'>
					<SimpleBtn>Sign in</SimpleBtn>
				</div>
				<p className='text-black pt-5 text-center'>
					Already have an account?{' '}
					<Link
						href='/auth/login'
						className='text-[#f45d2c] subpixel-antialiased'
					>
						Sign in
					</Link>
				</p>
			</form>
			<GetBack />
		</>
	);
};

export default LoginPage;
