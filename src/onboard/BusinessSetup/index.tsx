'use client';

import React from 'react';
import './biz_setup.scss';
import { useFormik } from 'formik';

import BusinessInfo from './views/BusinessInfo';
import BankDetails from './views/BankDetails';
import UploadItem from './views/UploadItem';
import AllSet from './views/AllSet';
import OnboardFooter from '@/molecules/OnboardFooter';

const BusinessSetup = () => {
	const { handleSubmit, getFieldProps, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},

		onSubmit: values => {
			// if (!isLoading) {
			// 	onLogin(values);
			// }
		},
	});
	return (
		<>
			{/* <AllSet /> */}
			<div className='business_page'>
				<h2 className='auth_h2'>Complete Your Business Setup</h2>
				<div className='tracker_div'>
					<span className='done'>
						<span className='label'>Business information</span>
					</span>
					<span>
						<span className='label'>Settlement bank account details</span>
					</span>
					<span>
						<span className='label'>Upload items you&apos;d like to sell</span>
					</span>
				</div>
				<form className='form_wrapper'>
					{/* <BusinessInfo /> */}
					{/* <BankDetails /> */}
					<UploadItem />
				</form>
			</div>
			<OnboardFooter />
		</>
	);
};

export default BusinessSetup;
