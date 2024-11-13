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
import { APIErrorResponse, SelectedAddress } from '@/types/types';
import AddressInput from '@/components/common/AddressInput';
import { formatPhoneNumber } from '@/utils/helpers';

const SignUpSchema = Yup.object({
	address: Yup.object({
		address: Yup.string().required('Address is required'),
		latitude: Yup.number().required('Latitude is required'),
		longitude: Yup.number().required('Longitude is required'),
		sourceGooglePlaceID: Yup.string().required(
			'Source Google Place ID is required'
		),
	}).required('Address is required'),
	password: Yup.string().required('Password is required'),
	phone: Yup.string().required('Phone Number is required'),
	firstName: Yup.string().required('First Name is required'),
	lastName: Yup.string().required('Last Name is required'),
	email: Yup.string().required('Email is required'),
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
		address: SelectedAddress;
		password: string;
		phone: string;
		firstName: string;
		lastName: string;
		email: string;
	}) => {
		try {
			await signup({ ...values, reference: reference ?? '' });
		} catch (error) {
			const message = getErrorMessage(error as APIErrorResponse);
			toast.error(message);
		}
	};

	const {
		handleBlur,
		handleSubmit,
		handleChange,
		values,
		errors,
		setFieldValue,
	} = useFormik({
		initialValues: {
			address: {
				address: '',
				latitude: 0,
				longitude: 0,
				sourceGooglePlaceID: '',
			},
			password: '',
			phone: '',
			firstName: '',
			lastName: '',
			email: '',
		},
		validationSchema: SignUpSchema,
		onSubmit: values => {
			values.phone = formatPhoneNumber(values.phone);
			if (!isLoading) {
				onSignUp(values);
			}
		},
	});

	return (
		<Wrapper title={'Sign Up'}>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4 md:gap-6'>
				<div className='flex gap-4 md:gap-6'>
					<div className='w-[50%]'>
						<TextInput
							id='firsName'
							name='firstName'
							value={values.firstName}
							onChange={handleChange}
							onBlur={handleBlur}
							type='text'
							placeholder='First Name'
							errors={errors?.firstName}
							extraClass='!ring-[1.5px]'
						/>
					</div>
					<div className='w-[50%]'>
						<TextInput
							id='lastname'
							name='lastName'
							value={values.lastName}
							onChange={handleChange}
							onBlur={handleBlur}
							type='text'
							placeholder='Last Name'
							errors={errors?.lastName}
							extraClass='!ring-[1.5px]'
						/>
					</div>
				</div>
				<AddressInput
					editAddress={address => {
						setFieldValue('address', {
							address: address.address,
							latitude: address.latitude,
							longitude: address.longitude,
							sourceGooglePlaceID: address.sourceGooglePlaceID,
						});
					}}
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
