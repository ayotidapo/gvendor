'use client';

import { useState } from 'react';
import Button from '@/components/buttons/Button';
import  TextInput  from '@/components/input/TextInput';
import { Gilroy } from '@/fonts/font';
import { useForgotPasswordMutation } from '@/redux/reducers/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as Types from '@/types/types';
import { toast } from 'react-toastify';
import Wrapper from '../Wrapper';
import { getErrorMessage } from '@/helpers';

type Response = {
	data: {
		data: null;
		message: string;
		success: boolean;
	};
};

const EmailSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('A valid email is required'),
});


const ForgotPassword = () => {
	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
	const [linkSent, setLinkSent] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const onForgotPassword = async (email: Types.ForgotPassword) => {
		try {
			const res: unknown = await forgotPassword(email);
			const responseData = res as Response;
			if (responseData?.data?.success) {
				setLinkSent(true);
				setMessage(responseData?.data?.message);
				toast.success('Reset link sent!', { theme: 'colored' });
			} else {
				toast.error('Failed to send reset link.');
			}
		} catch (error) {
			const message = getErrorMessage(error as Types.APIErrorResponse);
			toast.error(message);
		}
	};

	const { handleBlur, handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: EmailSchema,
		onSubmit: (values) => {
			if (!isLoading) {
				onForgotPassword(values);
			}
		},
	});

	return (
		<Wrapper title={'Forgot Password'}>
			{!linkSent ? (
				<form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
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
					</div>


					<div className='mt-6'>
						<Button
							loading={isLoading}
							spinColor='#ffffff'
							type='submit'
							label='Get Link'
							additionalClass='!py-4'
						/>
					</div>
				</form>
			) : (
				<div className='lg:mt-6'>
					<div className={`${Gilroy.className} mt-4 text-center`}>
						{message}.
					</div>
				</div>
			)}
		</Wrapper>
	);
};

export default ForgotPassword;
