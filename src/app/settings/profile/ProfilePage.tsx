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
	cacNumber: Yup.string().required('CAC Number is required'),
	nafdacNumber: Yup.string().required('NAFDAC Number is required'),
	tinNumber: Yup.string().required('TIN Number is required'),
	sonNumber: Yup.string().required('SON Number is required'),
	serviceOffered: Yup.string().required('Service is required'),
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
						label={'Change Photo'}
						name={'primary'}
					/>
				</div>
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
						name: profile?.name ?? '',
						address: profile?.businessDetails.businessAddress ?? {
							address: '',
							latitude: 0,
							longitude: 0,
							sourceGooglePlaceID: '',
						},
						email: profile?.email ?? '',
						phone: profile?.phone ?? '',
						cacNumber: profile?.businessDetails.cacNumber ?? '',
						nafdacNumber: profile?.businessDetails.nafdacNumber ?? '',
						tinNumber: profile?.businessDetails.tinNumber ?? '',
						sonNumber: profile?.businessDetails.sonNumber ?? '',
						serviceOffered: profile?.businessDetails.servicesOffered ?? '',
						website: profile?.website ?? '',
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
									placeholder='First Name'
									errors={touched.name ? errors?.name : ''}
								/>
								<TextInput
									type={'text'}
									name='name'
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Last Name'
									errors={touched.name ? errors?.name : ''}
								/>
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

								<TextInput
									type={'text'}
									name='service'
									value={values.serviceOffered}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Service offered'
									errors={errors?.serviceOffered}
								/>

								<TextInput
									type={'text'}
									name='nadfac'
									value={values.nafdacNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='NAFDAC Number'
									errors={errors?.nafdacNumber}
								/>
								<TextInput
									type={'text'}
									name='cac'
									value={values.cacNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='CAC Number'
									errors={errors?.cacNumber}
								/>
								<TextInput
									type={'text'}
									name='tin'
									value={values.tinNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='TIN Number'
									errors={errors?.tinNumber}
								/>
								<TextInput
									type={'text'}
									name='son'
									value={values.sonNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='SON Number'
									errors={errors?.sonNumber}
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
									placeholder='Business Description'
									errors={errors?.description}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>

			<div className='pt-6'>
				<span>
					<Header header={'Personal bank account'} className='pb-4' />
				</span>

				<Formik
					initialValues={{
						accountProvider: profile?.settlementAccount?.bankName ?? '',
						accountName: profile?.settlementAccount?.accountName ?? '',
						accountNumber: profile?.settlementAccount?.accountNumber ?? '',
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
							<div className='space-y-4 md:w-[800px]'>
								<div className='text-secondary-black'>Account Provider</div>
								<TextInput
									type={'text'}
									name='name'
									value={values.accountProvider}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Account Provider'
									errors={errors?.accountProvider}
								/>
								<div className='text-secondary-black'>Account Number</div>
								<TextInput
									type={'text'}
									name='name'
									value={values.accountNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Account Number'
									errors={errors?.accountNumber}
								/>
								<div className='text-secondary-black'>Account Name</div>
								<TextInput
									type={'text'}
									name='name'
									value={values.accountName}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Account Name'
									errors={errors?.accountName}
								/>
							</div>

							<div className='mt-6 pb-10'>
								<div className='flex items-center justify-center pt-2 space-x-4'>
									<div className='md:w-[138px]'>
										<Button label={'Cancel'} name='outline' />
									</div>
									<div className='md:w-[138px]'>
										<Button label={'Save'} type='submit' />
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
				{/* </form> */}
			</div>
		</div>
	);
};

export default ProfilePage;
