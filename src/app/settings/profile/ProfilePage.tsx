'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/typography/Header';
import TextInput from '@/components/input/TextInput';
import Button from '@/components/buttons/Button';
import '../profile/timeinput.css';
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
import { useGetAccountQuery, useGetBankQuery } from '@/redux/miscellaneous/getbank.slice';

const profileSchema = Yup.object({
	address: Yup.string().required('Business address is required'),
	email: Yup.string().required('Email address is required'),
	phone: Yup.string().required('Phone number is required'),
	website: Yup.string().required('Website URL is required'),
	description: Yup.string().required('Business description is required'),
});

const ProfilePage = () => {
	const [selectedValue, setSelectedValue] = useState<string | number>('');
	const { data: profile, isLoading } = useGetProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();
	const { data: bankData } = useGetBankQuery();
	const { data: account } = useGetAccountQuery({
		accountNumber: '0480819437',
		bankCode: '058',
	});

	const formattedBankOptions = bankData?.data
		? bankData.data.map((bank: any) => ({
				label: bank.name,
				value: bank.code,
			}))
		: [];

	useEffect(() => {
		if (profile) {
			setFieldValue('address', profile.address);
			setFieldValue('email', profile.email);
			setFieldValue('phone', profile.phone);
			setFieldValue('website', profile.website);
			setFieldValue('description', profile.description);
		}
		console.log(account);
	}, [profile, account]);

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
		},
		validationSchema: profileSchema,
		onSubmit: values => {
			if (!isLoading) {
				// console.log('Form Submitted', values);
				updateProfile(values);
				toast.success('Profile updated successfully');
			}
		},
	});

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
					Configure the standard hours <ol></ol>f operation for this business
				</span>
				<div className='mt-6'>
					{/* {profile?.availableHours?.map((day) => ( */}
					{/* <>
							<div>
								{profile?.availableHours}
							</div>
							<button
								disabled={false }
								key={profile._id}
								onClick={() => {

								}}
							>
								<Switch
									checked={day?.sunday?.open}
									// disabled={}
								/>
								<span>
									{day?.friday?.open ? 'Open' : 'Closed'}
								</span>
							</button>
							<input type='time' className='custom-time-input'></input>
						</> */}
					{/* ))}  */}
				</div>
				<div className='mt-6 w-[143px]'>
					<Button label={'Save Schedule'} />
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
							<Header header={'AMOS EDOS OSAMUDIAMEN'} />
							<div className='flex space-x-3 items-center text-sm text-[#000000] md:w-[400px] md:gap-6'>
								<p>FIRST BANK OF NIGERIA</p>
								<p>|</p>
								<p>0001112278</p>
							</div>
						</div>
					</div>
				</div>
				<div className='pt-6 space-y-4 md:w-[800px]'>
					{/* {getbank.map(bank => ( */}
					<Select
						options={formattedBankOptions}
						placeholder='Bank'
						value={selectedValue}
						onChange={handleSelectChange}
					/>
					{/* // ))} */}
					{/* <TextInput type={'text'} name={''} placeholder='Bank' /> */}
					<TextInput type={'text'} name={''} placeholder='Account name' />
					<TextInput type={'text'} name={''} placeholder='Account number' />
				</div>
				<div className='mt-6 w-[183px]'>
					<Button label={'Add account'} />
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
