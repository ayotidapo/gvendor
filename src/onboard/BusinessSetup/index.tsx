'use client';

import React, { useState } from 'react';
import './biz_setup.scss';
import { useFormik } from 'formik';
import cx from 'classnames';
import BusinessInfo from './views/BusinessInfo';
import BankDetails from './views/BankDetails';
import UploadItem from './views/UploadItem';
import TimePicker from 'react-time-picker';
import AllSet from './views/AllSet';
import OnboardFooter from '@/molecules/OnboardFooter';

const BusinessSetup = () => {
	const [step, setStep] = useState(0);
	const [success, setSuccess] = useState(false);
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

	const onNextStep = (step: number) => {
		setStep(step);
	};

	const onSetSuccess = (staus: boolean) => {
		setSuccess(staus);
	};

	if (success)
		return (
			<>
				<AllSet />
				<OnboardFooter />
			</>
		);

	return (
		<>
			<div className='business_page'>
				<h2 className='auth_h2'>Complete Your Business Setup</h2>
				<div className='tracker_div'>
					<span className={cx({ done: step > 0 })}>
						<span className='label'>Business information</span>
					</span>
					<span className={cx({ done: step > 1 })}>
						<span className='label'>Settlement bank account details</span>
					</span>
					<span className={cx({ done: step > 2 })}>
						<span className='label'>Upload items you&apos;d like to sell</span>
					</span>
				</div>
				<div className='form_wrapper'>
					{step === 0 && <BusinessInfo setStep={onNextStep} />}
					{step === 1 && (
						<BankDetails setStep={onNextStep} setSuccess={onSetSuccess} />
					)}
					{step === 2 && <UploadItem />}
				</div>
			</div>
			<OnboardFooter />
		</>
	);
};

export default BusinessSetup;
