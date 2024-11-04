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
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import {
	useGetAccountQuery,
	useGetBankQuery,
	useUpdateAccountMutation,
} from '@/redux/miscellaneous/getbank.slice';
import { Bank } from '@/redux/miscellaneous/getbank.type';
import AddressInput from '@/components/common/AddressInput';

const profileSchema = Yup.object({
	address: Yup.object().shape({
		address: Yup.string().required('Address is required'),
		latitude: Yup.number().required('Latitude is required'),
		longitude: Yup.number().required('Longitude is required'),
		sourceGooglePlaceID: Yup.string().required('Google Place ID is required'),
	}),
	email: Yup.string().required('Email address is required'),
	phone: Yup.string().required('Phone number is required'),
	website: Yup.string().required('Website URL is required'),
	description: Yup.string().required('Business description is required'),
	accountName: Yup.string().required('Account name is required'),
	accountNumber: Yup.string().required('Account Number is required'),
});

const ProfilePage = () => {
	const { data: profile, isLoading } = useGetProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();
	const [updateAccount] = useUpdateAccountMutation();
	const { data: bankData } = useGetBankQuery();
	const [accountData, setAccountData] = useState<{
		accountNumber: string;
		bankCode: string;
		bankName: string;
	}>({
		accountNumber: '',
		bankCode: '',
		bankName: '',
	});
	const { data: account, refetch: refetchAccount } = useGetAccountQuery(
		{
			bankCode: accountData.bankCode,
			accountNumber: accountData.accountNumber,
		},
		{
			skip:
				!accountData.bankCode ||
				!accountData.accountNumber ||
				accountData.accountNumber.length < 10,
		}
	);

	const formattedBankOptions = bankData?.data
		? bankData?.data?.map((bank: Bank) => ({
				label: bank.name,
				value: bank.code,
			}))
		: [];

	useEffect(() => {
		if (accountData.accountNumber.length === 10 && accountData.bankCode) {
			refetchAccount();
		}
	}, [accountData.accountNumber, accountData.bankCode]);

	const handleUpdateAccount = async () => {
		if (accountData) {
			await updateAccount(accountData);
		}
	};

	return (
		<div className='pt-8'>
			<div>
				<Header header={'Profile picture'} />
			</div>
			<div className='mt-8 flex flex-col md:flex-row md:space-x-10'>
				<div>
					<ImageUpload currentImage={profile?.logo} />
				</div>
				<div className='pt-6 md:pt-14'>
					<Button
						additionalClass='p-4'
						label={'Edit profile'}
						name={'primary'}
					/>
				</div>
			</div>
			<div className='pt-8 space-y-4'>
				<span>
					<Header header={'Personal Information'} />
				</span>
				<Formik
					initialValues={{
						firstName: profile?.firstName ?? '',
						lastName: profile?.lastName ?? '',
						email: profile?.email ?? '',
						phone: profile?.phone ?? '',
					}}
					validationSchema={profileSchema}
					onSubmit={values => {
						if (!isLoading) {
							updateProfile(values);
							toast.success('Information successfully updated');
						}
					}}
					enableReinitialize
				>
					{({ values, handleBlur, handleChange, errors, touched }) => (
						<Form>
							<div className='space-y-2'>
								<div className='text-secondary-black'>First name</div>
								<TextInput
									type={'text'}
									name={'name'}
									value={values.firstName}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='First Name'
									errors={touched.firstName ? errors?.firstName : ''}
									extraClass='md:w-[800px]'
								/>
								<div className='text-secondary-black pt-2'>Last name</div>
								<TextInput
									type={'text'}
									name={'name'}
									value={values.lastName}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Last Name'
									errors={touched.lastName ? errors.lastName : ''}
									extraClass='md:w-[800px]'
								/>
								<div className='text-secondary-black pt-2'>Email Address</div>
								<TextInput
									type={'text'}
									name={'email'}
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Email Address'
									errors={touched.email ? errors?.email : ''}
									extraClass='md:w-[800px]'
								/>
								<div className='text-secondary-black pt-2'>Phone number</div>
								<TextInput
									type={'text'}
									name={'phone'}
									value={values.phone}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Phone Number'
									errors={touched.phone ? errors?.phone : ''}
									extraClass='md:w-[800px]'
								/>
							</div>

							<div className='mt-6 w-full md:w-[102px] pb-10'>
								<Button label={'Update'} type='submit' />
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className='pt-12'>
				<span>
					<Header header={'Profile Information'} />
				</span>
				<span className='block mt-2'>
					Set up your business as a workspace. Define your industry and business
					description.
				</span>
				<Formik
					initialValues={{
						name: profile?.businessDetails.businessName ?? '',
						address: profile?.businessDetails.businessAddress ?? {
							address: '',
							latitude: 0,
							longitude: 0,
							sourceGooglePlaceID: '',
						},
						email: profile?.email ?? '',
						phone: profile?.phone ?? '',
						website: profile?.businessDetails?.website ?? '',
						description: profile?.description ?? '',
					}}
					validationSchema={profileSchema}
					onSubmit={values => {
						if (!isLoading) {
							updateProfile(values);
							toast.success('Profile updated successfully');
						}
					}}
					enableReinitialize
				>
					{({
						values,
						handleBlur,
						handleChange,
						errors,
						touched,
						setFieldValue,
					}) => (
						<Form className='pt-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
								<TextInput
									type={'text'}
									name='name'
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Business Name'
									errors={touched.name ? errors?.name : ''}
								/>
								<AddressInput
									editAddress={address => {
										setFieldValue('address', {
											address: address.address,
											latitude: address.latitude,
											longitude: address.longitude,
											sourceGooglePlaceID: address.sourceGooglePlaceID,
										});
									}}
									value={values.address.address}
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
								{/*<Select
									options={options}
									placeholder='Choose industry'

									value={selectedValue}
									onChange={handleSelectChange}
								/>*/}
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
								<Button label={'Update'} type='submit' />
							</div>
						</Form>
					)}
				</Formik>
			</div>

			<div className='pt-6'>
				<span>
					<Header header={'Bank Account'} className='pb-4' />
				</span>
				<div className='bg-off-white md:w-[580px] border border-[#EAEAEA] shadow-sm p-[24px] rounded-md flex items-center justify-between'>
					<div className='flex gap-7 items-center'>
						<div className='flex'>
							<Icon width={40} height={40} svg={'bank'} />
						</div>
						<div className=''>
							<Header header={profile?.settlementAccount?.accountName ?? ''} />
							<div className='flex space-x-3 items-center text-sm text-[#000000] md:w-[400px] md:gap-6'>
								<p>{profile?.settlementAccount?.bankName ?? ''}</p>
								<p>|</p>
								<p>{profile?.settlementAccount?.accountNumber ?? ''}</p>
							</div>
						</div>
					</div>
				</div>

				<form
					onSubmit={e => {
						e.preventDefault();
						handleUpdateAccount();
					}}
				>
					<div className='pt-6 space-y-4 md:w-[800px]'>
						<Select
							options={formattedBankOptions}
							placeholder='Bank'
							value={accountData?.bankCode || ''}
							onChange={value => {
								setAccountData(prevAccountData => ({
									...prevAccountData,
									bankCode: value as string,
									bankName: bankData?.data?.find(bank => bank.code === value)
										?.name as string,
									accountNumber: prevAccountData?.accountNumber || '',
								}));
							}}
						/>
						<TextInput
							type={'text'}
							name='accountName'
							value={account?.account_name ?? ''}
							onChange={() => {}}
							disabled
							placeholder='Account name'
						/>
						<TextInput
							type={'text'}
							name='accountNumber'
							value={accountData?.accountNumber}
							onChange={e => {
								setAccountData(prevAccountData => ({
									...prevAccountData,
									accountNumber: e.target.value,
								}));
							}}
							placeholder='Account number'
						/>
					</div>

					<div className='mt-6 w-[183px]'>
						<Button
							disabled={!account?.account_name}
							label={'Add account'}
							type='submit'
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
