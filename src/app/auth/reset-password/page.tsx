'use client';
import Button from '@/components/buttons/Button';
import  TextInput  from '@/components/input/TextInput';
import { Gilroy, GilroyMedium } from '@/fonts/font';
import { useResetPasswordMutation } from '@/redux/reducers/auth/authSlice';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Link from 'next/link';
import Wrapper from '../Wrapper';
import { getErrorMessage } from '@/helpers';
import { APIErrorResponse } from '@/types/types';

const ResetPasswordSchema = Yup.object({
	email: Yup.string().required('Email is required'),
	code: Yup.string().required('Enter code'),
	password: Yup.string().required('Password is required'),
});

const ResetPassword = () => {
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const router = useRouter();

	const onResetPassword = async (val: { email: string; password: string; code: string; }) => {
		try {
			const payload = {
				email: val.email,
				code: val.code,
				password: val.password,
			};

			const response = await resetPassword(payload);
			const responseData = response as { data: { success: boolean } };

			if (responseData?.data?.success) {
				toast.success('Password reset successfully', { theme: 'colored' });
				router.replace('/auth/login');
			}
		} catch (error) {
			const message = getErrorMessage(error as APIErrorResponse);
			toast.error(message);
		}
	};

	const { handleBlur, handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
			email: '',
			password: '',
			code: '',
		},
		validationSchema: ResetPasswordSchema,
		onSubmit: values => {
			if (!isLoading) {
				onResetPassword(values);
			}
		},
	});

	return (
		<Wrapper title={'Reset Password'}>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
				<div className={`${Gilroy.className}`}>
					<div>
						<TextInput
							id='email'
							name='email'
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							type='email'
							placeholder='Enter email'
							errors={errors?.email}
							extraClass='!ring-[1.5px]'
						/>
					</div>
				</div>

				<div className={`${Gilroy.className}`}>
					<div>
						<TextInput
							id='code'
							name='code'
							value={values.code}
							onChange={handleChange}
							onBlur={handleBlur}
							type='text'
							placeholder='Input code'
							errors={errors?.code}
							extraClass='!ring-[1.5px]'
						/>
					</div>
				</div>

				<div className={`${Gilroy.className}`}>
					<div>
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
					</div>
				</div>

				<Button
					loading={isLoading}
					disabled={isLoading}
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
