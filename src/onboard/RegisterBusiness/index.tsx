'use client';

import { Form, Formik } from 'formik';
import { useDispatch } from '@/redux/hooks';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import GetBack from '../GetBack';
import { useSelector } from '@/redux/hooks';
import { IAddress, ObjectData } from '@/utils/interface';

import RegisterBizForm from './RegisterBizForm';
import { useRouter } from 'next/navigation';
import { registerVendor } from '@/redux/apis/vendor';
import { setVendor } from '@/redux/reducers/vendor';

const validationSchema = Yup.object({
	firstName: Yup.string().required('First name is Required'),
	lastName: Yup.string().required('Last name is Required'),
	businessName: Yup.string().required('Business name is Required'),
	businessAddress: Yup.string(),
	email: Yup.string()
		.email('Enter valid email address')
		.required('Email is Required'),
	servicesOffered: Yup.string().required('Select service offered'),
	phone: Yup.string()
		.required('Phone number is required')
		.min(11, ' Enter valid phone number')
		.max(15, ' Enter valid phone number'),
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
	const { error, isSuccess, loading } = vendorUser;
	const router = useRouter();
	const [address, SetAddress] = useState<IAddress>({});
	const { businessName, email, reference } = props?.vendor || {};
	const onSelectLocation = (selectLocation: ObjectData) => {
		SetAddress(selectLocation);
	};
	console.log(vendorUser, 444444);
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
				onSubmit={(values, { setErrors }) => {
					if (!address?.address) {
						setErrors({ businessAddress: 'Address is required' });
						return;
					}

					const payload = {
						...values,
						businessAddress: { ...address },
						reference,
					};
					console.log(payload);
					dispatch(registerVendor(payload));
				}}
			>
				<Form className='w-[420px]'>
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
