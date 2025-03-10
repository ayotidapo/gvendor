import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import EditInputBox from '@/molecules/EditInputBox';
import { useDispatch, useSelector } from '@/redux/hooks';
import { setVendor } from '@/redux/reducers/vendor';

import { toast } from 'react-toastify';
import { updateVendorApi } from '@/redux/apis/vendor';

const validationSchema = Yup.object({
	firstName: Yup.string().required('First name is Required'),
	lastName: Yup.string().required('Last name name is Required'),
	email: Yup.string()
		.email('Enter a valid email address')
		.required('account name not found'),
	phone: Yup.string().required('account name not found'),
});

const PersonalInfo = () => {
	const dispatch = useDispatch();
	const vendor = useSelector(state => state?.vendor);
	const [loading, setLoading] = useState(false);

	const { getFieldProps, handleSubmit } = useFormik({
		initialValues: {
			firstName: vendor?.firstName,
			lastName: vendor?.lastName,
			email: vendor?.email,
			phone: vendor?.phone,
		},
		onSubmit: async values => {
			try {
				setLoading(true);
				const response = await updateVendorApi(values);
				dispatch(setVendor(response?.data));
				toast.success(`Profile updated!`);
			} catch (e: any) {
				toast.error(`Error: ${e?.message}`);
			} finally {
				setLoading(false);
			}
		},
		validationSchema,
	});

	return (
		<form onSubmit={handleSubmit}>
			<h2 className='h2 text-black'>Personal Information</h2>
			<EditInputBox
				title='First name'
				{...getFieldProps('firstName')}
				ctaName='Save'
				submitting={loading}
			/>
			<EditInputBox
				title='Last name'
				{...getFieldProps('lastName')}
				ctaName='Save'
				submitting={loading}
			/>
			<EditInputBox
				title='Email address '
				{...getFieldProps('email')}
				ctaName='Save'
				submitting={loading}
			/>
			<EditInputBox
				title='Phone number'
				{...getFieldProps('phone')}
				ctaName='Save'
				submitting={loading}
			/>
		</form>
	);
};

export default PersonalInfo;
