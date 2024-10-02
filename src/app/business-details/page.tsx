'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Header } from '@/components/typography/Header';
import { ChevronRight } from 'lucide-react';
import { useGetProfileQuery } from '@/redux/profile/profile.slice';
import Account from './Account';
import CreateBusinessForm from './CreateBusinessForm';

const Wrapper = () => {
	const { data: profile, isLoading } = useGetProfileQuery();
	const [step, setStep] = useState(1);

	const getHeader = () => {
		switch (step) {
			case 1:
				return 'More about your business';
			case 2:
				return 'More about your business';
			case 3:
				return 'Now, your account details';
			default:
				return 'More about your business';
		}
	};

	return (
		<div className='w-full max-w-screen-2xl pt-36 mx-auto px-[16px] md:px-[40px] lg:px-[60px] xl:px-[80px]'>
			<Header bigger header={getHeader()} className='text-center mb-12' />
			<nav className='flex items-center space-x-2'>
				<button
					className={clsx({
						'text-black font-semibold': step === 1,
						'text-light-gray': step !== 1,
					})}
					onClick={() => setStep(1)}
				>
					Profile
				</button>
				<ChevronRight width={16} />
				<button
					className={clsx({
						'text-black font-semibold': step === 2,
						'text-light-gray': step !== 2,
					})}
					onClick={() => setStep(2)}
				>
					Regulatory
				</button>
				<ChevronRight width={16} />
				<button
					className={clsx({
						'text-black font-semibold': step === 3,
						'text-light-gray': step !== 3,
					})}
					onClick={() => setStep(3)}
				>
					Account
				</button>
			</nav>
			{profile ? (
				<div>
					{(step === 1 || step === 2) && (
						<CreateBusinessForm
							isLoading={isLoading}
							profile={profile}
							setStep={setStep}
							step={step}
						/>
					)}
					{step === 3 && <Account />}
				</div>
			) : null}
		</div>
	);
};

export default Wrapper;
