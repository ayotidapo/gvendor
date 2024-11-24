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

const LoginSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('A valid email is required'),
	password: Yup.string().required('Please enter your password'),
});

const CreatePaswordPage = () => {
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

	return (
		<form onSubmit={handleSubmit} className='w-[420px]'>
			<h2 className='auth_h2'>Create a password for your account</h2>
			<div>
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
			</div>

			<div className='mt-6'>
				<SimpleBtn>Sign in</SimpleBtn>
			</div>
		</form>
	);
};

export default CreatePaswordPage;
