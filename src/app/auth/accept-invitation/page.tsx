'use client';
import { useEffect } from 'react';
import Button from '@/components/buttons/Button';
import TextInput from '@/components/input/TextInput';
import { Gilroy } from '@/fonts/font';
import { useSignupMutation } from '@/redux/reducers/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import Wrapper from '../Wrapper';
import { getErrorMessage } from '@/helpers';
import { APIErrorResponse } from '@/types/types';

const SignUpSchema = Yup.object({
	address: Yup.string().required('Address is required'),
	password: Yup.string().required('Password is required'),
	phone: Yup.string().required('Phone number is required'),
});

const SignUp = () => {
	const [signup, { isLoading, isSuccess }] = useSignupMutation();
	const searchParams = useSearchParams();
	const reference = searchParams.get('reference');
	const router = useRouter();
	useEffect(() => {
		if (isSuccess) {
			router.push('/auth/login');
		}
	}, [isSuccess]);

	const onSignUp = async (values: {
		address: string;
		password: string;
		phone: string;
	}) => {
		try {
			await signup({ ...values, reference: reference ?? '' });
		} catch (error) {
			const message = getErrorMessage(error as APIErrorResponse);
			toast.error(message);
		}
	};

	const { handleBlur, handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
			address: '',
			password: '',
			phone: '',
		},
		validationSchema: SignUpSchema,
		onSubmit: values => {
			if (!isLoading) {
				onSignUp(values);
			}
		},
	});

	return (
		<Wrapper title={'Sign Up'}>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
				<TextInput
					id='address'
					name='address'
					value={values.address}
					onChange={handleChange}
					onBlur={handleBlur}
					type='text'
					placeholder='Address'
					errors={errors?.address}
					extraClass='!ring-[1.5px]'
				/>

				<TextInput
					id='phoneNumber'
					name='phone'
					value={values.phone}
					onChange={handleChange}
					onBlur={handleBlur}
					type='text'
					placeholder='Phone Number'
					errors={errors?.phone}
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

				<Button
					loading={isLoading}
					disabled={isLoading}
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
