'use client';

import Button from '@/atoms/buttons/Button';
import TextInput from '@/atoms/input/TextInput';
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
import Wrapper from '../Wrapper';

const LoginSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('A valid email is required'),
	password: Yup.string().required('Please enter your password'),
});

const LoginPage = () => {
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();

	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LoginSchema,
		onSubmit: values => {
			if (!isLoading) {
				onLogin(values);
			}
		},
	});

	const onLogin = async (credentials: Login) => {
		try {
			const res: unknown = await login(credentials);
			const userAuthData = res as AuthResponse;
			if (userAuthData?.data?.user) {
				dispatch(updateUserWithAuth(userAuthData));
				toast.success('Login successful', { theme: 'colored' });
				const redirect = searchParams.get('redirect');
				router.push(redirect || '/');
			}
		} catch (error) {
			return error;
		}
	};

	return (
		<Wrapper title={'Welcome Back'}>
			<form onSubmit={handleSubmit}>
				<div className={`${Gilroy.className}`}>
					<div>
						<TextInput
							id='email'
							{...getFieldProps('email')}
							errors={touched.email ? errors.email : ''}
							type='text'
							placeholder='Email address'
							extraClass='!ring-[1.5px]'
						/>
					</div>

					<div className='mt-4'>
						<TextInput
							id='password'
							{...getFieldProps('password')}
							errors={touched.password ? errors.password : ''}
							type='password'
							placeholder='Password'
							extraClass='!ring-[1.5px]'
						/>
					</div>
				</div>

				<div
					className={`mt-2 text-md cursor-pointer ${GilroyMedium.className}`}
				>
					<Link
						href={'/auth/forgot-password'}
						className='hover:underline transition-all duration-500'
					>
						{' '}
						Forgot your password?
					</Link>
				</div>

				<div className='mt-6'>
					<Button
						loading={isLoading}
						spinColor='#ffffff'
						type='submit'
						label='Sign in'
						additionalClass='!py-4'
					/>
				</div>
			</form>
		</Wrapper>
	);
};

export default LoginPage;
