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
	businessAddress: Yup.string(),
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

	website: Yup.string().required('Enter a valid link'),
});

interface Props {
	vendor?: {
		reference: string;
		businessName: string;
		email: string;
		[key: string]: any;
	};
}
const Register: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const vendorUser = useSelector(state => state?.vendor);

	const { isError, error, isSuccess, loading } = vendorUser;
	const router = useRouter();
	const [address, SetAddress] = useState<IAddress>({});
	const { businessName, email, reference } = props?.vendor || {};
	const onSelectLocation = (selectLocation: ObjectData) => {
		SetAddress(selectLocation);
	};

	useEffect(() => {
		dispatch(setVendor({ businessName, email }));
	}, []);

	if (isSuccess && !reference) {
		return <GetBack />;
	}

	if (isSuccess && reference) {
		const qS = vendorUser?._id ? `?vendorId=${vendorUser?._id}` : '';
		router.replace(`/auth/create-password${qS}`);
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
					businessAddress: '',
				}}
				validationSchema={validationSchema}
				onSubmit={async (values, { setErrors }) => {
					if (!address?.address) {
						setErrors({ businessAddress: 'Address is required' });
						return;
					}

					const payload = {
						...values,
						businessAddress: { ...address },
						phone: values?.phone.replace('+', ''),
						reference,
						servicesOffered: [values?.servicesOffered],
					};

					dispatch(registerVendor(payload));
				}}
			>
				<Form className='auth__form'>
					<h2 className='auth_h2'>Register your business with Good!</h2>
					<RegisterBizForm
						onSelectLocation={onSelectLocation}
						submitting={loading}
					/>
				</Form>
			</Formik>
		</>
	);
};

export default Register;
