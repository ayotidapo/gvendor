import Button from '@/components/buttons/Button';
import  TextInput  from '@/components/input/TextInput';
import { Header } from '@/components/typography/Header';
import React, { useState } from 'react';
import clsx from 'clsx';
import parse from 'html-react-parser';
import { CheckIcon } from '@heroicons/react/24/outline';

const reasons = [
	'I no longer use this account.',
	'I have another account',
	'I want to create a new account',
	'Concerns about account security/Unauthorized activity',
	'Privacy-related concerns.',
	`I have open issues with <span className={"font-extrabold recoleta"}>Good</span> Things Co.`,
	'I prefer not to disclose a reason.',
];

const SecurityPage = () => {
	const [deleteReason, setDeleteReason] = useState('');

	return (
		<div className='pt-8 space-y-4'>
			<div>
				<Header header={'Password'} />
			</div>
			<div className='space-y-4 w-[800px]'>
				<TextInput
					type={'password'}
					placeholder={'Current password'}
					name={''}
				/>
				<TextInput type={'password'} placeholder={'New password'} name={''} />
				<TextInput
					type={'password'}
					placeholder={'Confirm password'}
					name={''}
				/>
			</div>
			<div className='mt-6 w-[183px]'>
				<Button label={'Change password'} />
			</div>
			<div className='pt-[74px] gap-6'>
				<div>
					<Header header={'Close your account'} className='text-[#F25A68]' />
				</div>
				<div className='text-secondary-black pt-4'>
					Closing your account means you will no longer have access to this
					account. You will lose all your sales, orders, teams and other data.
				</div>
				<div>
					<div className='pt-4'>
						Please select the reason for closing your Good account
					</div>
					{reasons.map((reason, idx) => (
						<div key={idx} className='relative flex items-center py-2'>
							<div
								onClick={() => setDeleteReason(reason)}
								className='flex w-full hover:cursor-pointer'
							>
								<div>
									<div
										className={clsx(
											'w-5 h-5 border-[1.5px] flex items-center justify-center rounded-full',
											{
												'bg-brand-orange border-brand-orange':
													reason === deleteReason,
												'border-default-gray': reason !== deleteReason,
											}
										)}
									>
										{reason === deleteReason && (
											<CheckIcon className='w-4 h-4 font-extrabold text-white bg-orange rounded-full' />
										)}
									</div>
								</div>
								<div className='ml-4 text-md space-y-6'>{parse(reason)}</div>
							</div>
						</div>
					))}
					<div className='mt-6 w-[183px]'>
						<Button label={'Delete account'} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecurityPage;
