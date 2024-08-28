'use client'

import Button from '@/components/buttons/Button';
import TextInput from '@/components/input/TextInput';
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
import { AuthHeader } from '@/components/typography/AuthHeader';
import Wrapper from '../Wrapper';

const LoginSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('A valid email is required'),
	password: Yup.string().required('Please enter your password'),
});


const LoginPage = () => {
	return (
		<Wrapper>
			<AuthHeader title='Welcome back' className='text-center mb-10' />
			<LoginForm />
		</Wrapper>
	);
};

const LoginForm = ({ onFinish }: { onFinish?: () => void }) => {
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();

	const { handleBlur, handleSubmit, handleChange, values, errors } = useFormik({
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

				if (onFinish) {
					onFinish();
				} else {
					const redirect = searchParams.get('redirect');
					router.push(redirect || '/');
				}
			}
		} catch (error) {
			return error;
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
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

					<div className='mt-4'>
						<TextInput
							id='password'
							onChange={handleChange}
							onBlur={handleBlur}
							name='password'
							type='password'
							placeholder='Password'
							errors={errors?.password}
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
		</div>
	);
};

export default LoginPage;

