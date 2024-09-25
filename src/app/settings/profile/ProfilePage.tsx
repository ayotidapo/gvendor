'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/typography/Header';
import TextInput from '@/components/input/TextInput';
import Button from '@/components/buttons/Button';
import { Icon } from '@/components/icon/icon';
import Select from '@/components/select/Select';
import * as Yup from 'yup';
import ImageUpload from '@/components/image/ImageUpload';
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '@/redux/profile/profile.slice';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Switch from '@/components/switch/Switch';
import {
	useGetAccountQuery,
	useGetBankQuery,
	useUpdateAccountMutation,
} from '@/redux/miscellaneous/getbank.slice';

const profileSchema = Yup.object({
	address: Yup.string().required('Business address is required'),
	email: Yup.string().required('Email address is required'),
	phone: Yup.string().required('Phone number is required'),
	website: Yup.string().required('Website URL is required'),
	description: Yup.string().required('Business description is required'),
	accountName: Yup.string().required('Account name is required'),
	accountNumber: Yup.string().required('Account Number is required')
});

const ProfilePage = () => {
	const [selectedValue, setSelectedValue] = useState<string | number>('');
	const [accountNumber, setAccountNumber] = useState<string>('')
	const [accountName, setAccountName] = useState<string>('')
	const [displayedAccount, setDisplayedAccount] = useState<{
		name: string,
		number: string,
		bank:string | number,
	} |null>(null)
	const { data: profile, isLoading } = useGetProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();
	const [updateAccount] = useUpdateAccountMutation();
	const { data: bankData } = useGetBankQuery()
	const { data: account , refetch: refetchAccount } = useGetAccountQuery({
		bankCode: selectedValue, accountNumber
	},{ skip: !selectedValue || !accountNumber});
	
	const [availableHours, setAvailableHours] = useState<{
		[key: string]: { open: boolean; openingTime: string; closingTime: string };
	}>({});

	const formattedBankOptions = bankData?.data ? bankData?.data?.map((bank: any) => ({
		label: bank.name,
		value: bank.code,
	})) : [];

	useEffect(() => {
		if (selectedValue && accountNumber) {
			refetchAccount()
		}
	}, [selectedValue, accountNumber, refetchAccount])
	
	useEffect(() => {
		if (account && account.account_name) {
			setAccountName(account.account_name)
			setFieldValue('accountName', account.account_name)
		}
	},[account])

	useEffect(() => {
		if (profile) {
			setFieldValue('address', profile.address);
			setFieldValue('email', profile.email);
			setFieldValue('phone', profile.phone);
			setFieldValue('website', profile.website);
			setFieldValue('description', profile.description);
			setAvailableHours(profile.availableHours);
		}
	}, [profile, account, updateAccount]);

	const handleSelectChange = (value: string | number) => {
		setSelectedValue(value);
	};

	const {
		handleBlur,
		handleChange,
		handleSubmit,
		values,
		errors,
		setFieldValue,
	} = useFormik({
		initialValues: {
			address: profile?.address ?? '',
			email: profile?.email ?? '',
			phone: profile?.phone ?? '',
			website: profile?.website ?? '',
			description: profile?.description ?? '',
			accountName: '',
			accountNumber: '',
		},
		validationSchema: profileSchema,
		onSubmit: values => {
			if (!isLoading) {
				updateProfile(values);
				toast.success('Profile updated successfully');
			}
		},
	});

	const handleAccount = async () => {
		try {
			const updatedAccount = await updateAccount({
				accountNumber,  
				bankCode: selectedValue,  
				data: {                 
					name: accountName,  
				},
			}).unwrap();
			
			setDisplayedAccount({
				name: accountName,  
				number: accountNumber,      
				bank: selectedValue,        
			});
	
			toast.success('Account updated successfully');
		} catch (error) {
			toast.error('Failed to update account');
			console.error('Error updating account:', error);
		}
	};

	const options = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' },
	];

	return (
		<div className='pt-8'>
			<div>
				<Header header={'Profile picture'} />
			</div>
			<div className='mt-8 flex flex-col md:flex-row md:space-x-10'>
				<div>
					<ImageUpload />
				</div>
				<div className='pt-6 md:pt-14'>
					<Button label={'Edit profile'} name={'inverted'} />
				</div>
			</div>

			<form onSubmit={handleSubmit} className='pt-6'>
				<span>
					<Header header={'Profile Information'} />
				</span>
				<span className='block mt-2'>
					Set up your business as a workspace. Define your industry and business
					description.
				</span>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
					<div className='bg-off-white border border-[#EAEAEA] shadow-sm p-4 rounded-md'>
						<span className='text-secondary-black'>Store name</span>
						<span className='text-black block'>{profile?.name}</span>
					</div>
					<div className='bg-off-white border border-[#EAEAEA] shadow-sm p-4 rounded-md'>
						<span className='text-secondary-black'>Workshop ID</span>
						<span className='text-black block'>{profile?._id}</span>
					</div>
					<TextInput
						type={'text'}
						name='address'
						value={values.address}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='Business address'
						errors={errors?.address}
					/>
					<TextInput
						type={'text'}
						name='email'
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='Email address'
						errors={errors?.email}
					/>
					<TextInput
						type={'text'}
						name='phone'
						value={values.phone}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='Phone number'
						errors={errors?.phone}
					/>
					<TextInput
						type={'text'}
						name='website'
						value={values.website}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='Website url'
						errors={errors?.website}
					/>
					<Select
						options={options}
						placeholder='Choose industry'
						value={selectedValue}
						onChange={handleSelectChange}
					/>
				</div>
				<div className='mt-6'>
					<TextInput
						type={'textarea'}
						name='description'
						value={values.description}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='Description'
						errors={errors?.description}
					/>
				</div>
				<div className='mt-6 w-full md:w-[120px] pb-10'>
					<Button label={'Update'} onClick={handleSubmit} />
				</div>
			</form>

			<div className='pt-6'>
				<span>
					<Header header={'Set standard hours'} />
				</span>
				<span className='block mt-2'>
					Configure the standard hours of operation for this business
				</span>
				<div className='mt-6'>
					{profile?.availableHours
						? Object.entries(availableHours).map(([day, availableHours]) => (
								<div
									key={day}
									className='grid min-h-14 grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center mb-4 border-b border-default-gray-2 pb-4 lg:border-transparent'
								>
									<p className='font-bold capitalize'>{day}</p>
									<div className='flex items-center space-x-2'>
										<Switch
											enabled={availableHours.open}
											setEnabled={value => {
												setAvailableHours(prevHours => ({
													...prevHours,
													[day]: {
														...prevHours[day],
														open: value,
													},
												}));
											}}
										/>
										<span>{availableHours.open ? 'Open' : 'Closed'}</span>
									</div>
									{availableHours.open && (
										<div className='col-span-3 flex space-x-4 items-center'>
											<TimeInput
												value={availableHours.openingTime}
												onChange={value => {
													setAvailableHours(prevHours => ({
														...prevHours,
														[day]: {
															...prevHours[day],
															openingTime: value,
														},
													}));
												}}
											/>
											<span>To</span>
											<TimeInput
												value={availableHours.closingTime}
												onChange={value => {
													setAvailableHours(prevHours => ({
														...prevHours,
														[day]: {
															...prevHours[day],
															closingTime: value,
														},
													}));
												}}
											/>
										</div>
									)}
								</div>
							))
						: null}
				</div>
				<div className='mt-6 w-[143px]'>
				<Button
						onClick={() => {
							// loop through availableHours and remove opening time and closing time if open is false
							const updatedHours = Object.entries(availableHours).reduce(
								(acc, [day, hours]) => {
									if (!hours.open) {
										return {
											...acc,
											[day]: {
												open: false,
											},
										};
									} else {
										return {
											...acc,
											[day]: hours,
										};
									}
								},
								{}
							);
							updateProfile({ availableHours: updatedHours });
						}}
						label={'Save Schedule'}
					/>
				</div>
			</div>

			<div className='pt-6'>
				<span>
					<Header header={'Bank Account'} className='pb-4' />
				</span>
				<div className='bg-off-white md:w-[580px] border border-[#EAEAEA] shadow-sm p-[24px] rounded-md flex items-center justify-between'>
					<div className='flex gap-7 items-center'>
						<div className='flex'>
							<Icon svg={'bank'} />
						</div>
						<div className=''>
							<Header header={displayedAccount ? displayedAccount.name : 'No bank Name'} />
							<div className='flex space-x-3 items-center text-sm text-[#000000] md:w-[400px] md:gap-6'>
								<p>{ displayedAccount ? bankData?.data?.find(bank => bank.code === displayedAccount.bank)?.name : "No selected bank"}</p>
								<p>|</p>
								<p>{ displayedAccount ? displayedAccount.number : 'No account number'}</p>
							</div>
						</div>
					</div>
				</div>


				<form onSubmit={handleSubmit}>
				<div className='pt-6 space-y-4 md:w-[800px]'>
					<Select
						options={formattedBankOptions}
						placeholder='Bank'
						value={selectedValue}
						onChange={handleSelectChange}
					/>
						<TextInput
							type={'text'}
							name='accountName'
							value={accountName || values.accountName}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Account name'
						/>
						<TextInput
							type={'text'}
							name='accountNumber'
							value={values.accountNumber}
							onChange={(e) => {
								setAccountNumber(e.target.value);
								handleChange(e)
							}}
							onBlur={handleBlur}
							placeholder='Account number'
						/>
					</div>
					
				<div className='mt-6 w-[183px]'>
						<Button label={'Add account'} onClick={handleAccount} />
				</div>
				</form>
			</div>
		</div>
	);
};

const TimeInput = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) => {
	return (
		<input
			onChange={e => onChange(e.target.value)}
			value={value}
			type='time'
			className='bg-transparent border border-default-gray rounded-lg p-4 text-secondary-black md:w-52 md:h-14'
		/>
	);
};

export default ProfilePage;
