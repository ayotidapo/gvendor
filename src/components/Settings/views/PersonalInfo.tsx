import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import EditInputBox from '@/molecules/EditInputBox';
import { useDispatch, useSelector } from '@/redux/hooks';
import { setVendor } from '@/redux/reducers/vendor';

import { toast } from 'react-toastify';
import { updateVendorApi } from '@/redux/apis/vendor';
import { ObjectData } from '@/utils/interface';

const validationSchema = Yup.object({
	firstName: Yup.string().min(2, 'First name is too short').notRequired(),
	lastName: Yup.string().min(2, 'Last name is too short').notRequired(),
	email: Yup.string().email('Enter a valid email address').notRequired(),
	phone: Yup.string().notRequired().min(10, ' Enter valid phone number'),
});

const PersonalInfo = () => {
	const dispatch = useDispatch();
	const vendor = useSelector(state => state?.vendor);
	const [loading, setLoading] = useState(false);

	const { getFieldProps, handleSubmit, values, errors, touched } = useFormik({
		initialValues: {
			firstName: vendor?.firstName,
			lastName: vendor?.lastName,
			email: vendor?.email,
			phone: vendor?.phone,
		},
		onSubmit: async (values, formik) => {
			try {
				setLoading(true);
				const payload: ObjectData = {};
				Object.keys(values).forEach(field => {
					if ((values as ObjectData)[field]) {
						payload[field] = (values as ObjectData)[field];
					}
				});

				const response = await updateVendorApi(payload);
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
				submitting={loading || !values?.firstName}
				error={touched?.firstName ? errors?.firstName : ''}
			/>
			<EditInputBox
				title='Last name'
				{...getFieldProps('lastName')}
				ctaName='Save'
				submitting={loading || !values?.lastName}
				error={touched?.lastName ? errors?.lastName : ''}
			/>
			<EditInputBox
				title='Email address '
				{...getFieldProps('email')}
				ctaName='Save'
				submitting={loading || !values?.email}
				error={touched?.email ? errors?.email : ''}
			/>
			<EditInputBox
				title='Phone number'
				{...getFieldProps('phone')}
				ctaName='Save'
				submitting={loading || !values?.phone}
				error={touched?.phone ? errors?.phone : ''}
			/>
		</form>
	);
};

export default PersonalInfo;
