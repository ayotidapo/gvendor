'use client';

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import BusinessInfo from './views/BusinessInfo';
import BankDetails from './views/BankDetails';
import UploadItem from './views/UploadItem';
import AllSet from './views/AllSet';
import OnboardFooter from '@/molecules/OnboardFooter';
import { ObjectData } from '@/utils/interface';
import Fetch from '@/utils/fetch';
import './biz_setup.scss';

const BusinessSetup: React.FC = () => {
	const [step, setStep] = useState(0);
	const [success, setSuccess] = useState(false);
	const [banks, setBanks] = useState([]);

	useEffect(() => {
		getBanks();
	}, []);

	const onNextStep = (step: number) => {
		setStep(step);
	};

	const onSetSuccess = (staus: boolean) => {
		setSuccess(staus);
	};

	const getBanks = async () => {
		try {
			const response = await Fetch(`/vendor/banks`);
			const banks = response?.data?.data?.map((bank: ObjectData) => ({
				label: bank?.name,
				value: bank?.code,
			}));
			setBanks(banks || []);
		} catch {
			//console.log('e')
		}
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
						<BankDetails
							setStep={onNextStep}
							setSuccess={onSetSuccess}
							banks={banks}
						/>
					)}
					{step === 2 && <UploadItem />}
				</div>
			</div>
			<OnboardFooter />
		</>
	);
};

export default BusinessSetup;
