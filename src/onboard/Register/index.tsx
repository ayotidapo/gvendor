'use client';

import { Form, Formik } from 'formik';
import { useDispatch } from '@/redux/hooks';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import GetBack from '../GetBack';
import { useSelector } from '@/redux/hooks';
import { IAddress, ObjectData } from '@/utils/interface';

import RegisterBizForm from './RegisterBizForm';
import { notFound, useRouter } from 'next/navigation';
import { registerVendor } from '@/redux/apis/vendor';
import { setVendor } from '@/redux/reducers/vendor';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
	firstName: Yup.string().required('First name is Required'),
	lastName: Yup.string().required('Last name is Required'),
	businessName: Yup.string().required('Business name is Required'),
	businessAddress: Yup.object().shape({
		address: Yup.string().required('Address is required'),
		longitude: Yup.mixed(),
		latitude: Yup.mixed(),
	}),
	email: Yup.string()
		.email('Enter valid email address')
		.required('Email is Required'),
	servicesOffered: Yup.string().required('select service(s) offered'),
	// servicesOffered: Yup.array()
	// 	.of(Yup.string())
	// 	.min(1, 'select service(s) offered'), // Ensures the array has at least one element

	phone: Yup.string()
		.required('Phone number is required')
		.length(14, ' Enter valid phone number'),

	website: Yup.string()
		.nullable()
		.test('is-valid-url', 'Must be a valid URL', value => {
			// Only validate if there's a value
			if (value && value.length > 0) {
				const regex =
					/^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/[^\s]*)?$/;
				return regex.test(value);
			}
			return true; // return true if no value (optional)
		}),
});

interface Props {
	vendor?: {
		reference: string;
		businessName: string;
		email: string;
		[key: string]: any;
	};
	token?: string;
}
const Register: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const vendorUser = useSelector(state => state?.vendor);

	const { isError, error, isSuccess, loading, businessDetails } = vendorUser;
	const router = useRouter();

	useEffect(() => {
		dispatch(setVendor({ businessName, email }));
	}, []);

	const { businessName, email, reference } = props?.vendor || {};

	if (isSuccess && !reference) {
		return <GetBack />;
	}

	if (isSuccess && reference) {
		const qS = props?.token ? `&token=${props.token}` : '';
		router.replace(`/auth/create-password?vendorId=${vendorUser?._id}${qS}`);
	}

	if (isError) {
		toast.error(`Error: ${error}`);
		notFound();
	}

	return (
		<>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: email || '',
					phone: '',
					businessName: businessName || '',
					servicesOffered: '',
					website: '',
					businessAddress: {
						address: businessDetails?.businessAddress?.address,
						...businessDetails?.businessAddress,
					},
				}}
				validationSchema={validationSchema}
				onSubmit={async (values, { setErrors }) => {
					const payload = {
						...values,
						businessAddress: values?.businessAddress,
						phone: values?.phone.replace('+', ''),
						reference,
						servicesOffered: [values?.servicesOffered],
					};

					dispatch(registerVendor(payload));
				}}
			>
				<RegisterBizForm />
			</Formik>
		</>
	);
};

export default Register;
