'use client';

import React, { useState, ReactNode } from 'react';
import { useGetProfileQuery } from '@/redux/profile/profile.slice';
import Account from './Account';
import CreateBusinessForm from './CreateBusinessForm';
import BGIMG from '../../assets/login-bg.svg'
import clsx from 'clsx';
import { AuthHeader } from '@/components/typography/AuthHeader';
import { Gilroy } from '@/fonts/font';
import Image from 'next/image';
import { Minus } from 'lucide-react';

const BusinessDetails = () => {
	const { data: profile, isLoading } = useGetProfileQuery();
	const [step, setStep] = useState(1);

	const getHeader = () => {
		switch (step) {
			case 1:
				return 'Business Details';
			case 2:
				return 'Servies Offered';
			case 3:
				return 'Business Structure';
			case 4:
				return 'Regulatory Information';
			case 5:
				return 'Account Information';
			default:
				return 'Account Information';
		}
	};

	return (
		<Wrapper title={getHeader()} step={step} setStep={setStep}>
			{profile ? (
				<div>
					{step === 5 ? <Account /> : (
						<CreateBusinessForm
							isLoading={isLoading}
							profile={profile}
							setStep={setStep}
							step={step}
						/>
					)}
				</div>
			) : null}
		</Wrapper>
	);
};

const Wrapper = ({
	children,
	title,
	step,
	setStep
}: {
	children: ReactNode;
	title: string;
	step: number;
	setStep: (step: number) => void;
}) => {

	return (
		<div
			className={`
              ${Gilroy.variable}
              overflow-hidden lg:flex justify-center
          `}
		>
			<div
				className='
                  w-[100%] lg:w-[50%]
                  p-4
                  md:flex md:justify-center lg:justify-end
                  lg:px-24 lg:pb-0
                  h-screen pt-20
                  overflow-y-scroll hide-scroll-bar
                  '
			>
				<div className='md:max-w-[500px] w-[100%]'>
					<div className="flex justify-center pb-10">
						{Array(5).fill(null).map((_, index) => (
							<div onClick={() => setStep(index + 1)} key={index} className={clsx({
								'text-primary': step >= index + 1,
								'text-[#D9D9D9]': step < index + 1
							})}>
								<Minus width={40} />
							</div>
						))}
					</div>
					<AuthHeader title={title} className='text-center mb-10' />
					{children}
				</div>
			</div>
			<div
				className={`
                  w-[100%] lg:w-[50%]
                  lg:flex hidden
                  min-h-[100vh]
									justify-center items-center
              `}
			>
				<Image
					src={BGIMG}
					width={500}
					height={500}
					alt='bg image'
					className='rounded-xl'
				/>
			</div>
		</div>
	);
};


export default BusinessDetails;
