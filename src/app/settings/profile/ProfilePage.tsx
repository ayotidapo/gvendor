'use client';

import React from 'react';
import { Header } from '@/components/typography/Header';
import TextInput from '@/components/input/TextInput';
import Button from '@/components/buttons/Button';
import * as Yup from 'yup';
import ImageUpload from '@/components/image/ImageUpload';
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '@/redux/profile/profile.slice';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import AddressInput from '@/components/common/AddressInput';
import SectionCard from '@/components/cards/SectionCard';

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
	//const [updateAccount] = useUpdateAccountMutation();
	//const { data: bankData } = useGetBankQuery();
	//const [accountData, setAccountData] = useState<{
	//	accountNumber: string;
	//	bankCode: string;
	//	bankName: string;
	//}>({
	//	accountNumber: '',
	//	bankCode: '',
	//	bankName: '',
	//});
	//const { data: account, refetch: refetchAccount } = useGetAccountQuery(
	//	{
	//		bankCode: accountData.bankCode,
	//		accountNumber: accountData.accountNumber,
	//	},
	//	{
	//		skip:
	//			!accountData.bankCode ||
	//			!accountData.accountNumber ||
	//			accountData.accountNumber.length < 10,
	//	}
	//);

	//const formattedBankOptions = bankData?.data
	//	? bankData?.data?.map((bank: Bank) => ({
	//		label: bank.name,
	//		value: bank.code,
	//	}))
	//	: [];

	//useEffect(() => {
	//	if (accountData.accountNumber.length === 10 && accountData.bankCode) {
	//		refetchAccount();
	//	}
	//}, [accountData.accountNumber, accountData.bankCode]);

	//const handleUpdateAccount = async () => {
	//	if (accountData) {
	//		await updateAccount(accountData);
	//	}
	//};

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
			<div className='flex flex-col space-y-10 mt-10'>
				<SectionCard
					header={<Header header={'Profile Information'} />}
					content={
						<>
							<div>
								Set up your business as a workspace. Define your industry and
								business description.
							</div>
							<Formik
								initialValues={{
									name: profile?.businessDetails.businessName ?? '',
									firstName: profile?.firstName ?? '',
									lastName: profile?.lastName ?? '',
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
									serviceOffered:
										profile?.businessDetails.servicesOffered.join() ?? '',
									website: profile?.businessDetails.website ?? '',
									description: profile?.description ?? '',
								}}
								validationSchema={profileSchema}
								onSubmit={values => {
									if (!isLoading) {
										const restructureValues = {
											firstName: values.firstName,
											lastName: values.lastName,
											email: values.email,
											phone: values.phone,
											BusinessDetails: {
												businessName: values.name,
												businessAddress: values.address,
												website: values.website,
												socialMediaLinks: [],
												servicesOffered: values.serviceOffered.split(','),
												businessStructure: '',
												yearsOfExperince: '',
												annualTurnOver: 0,
												cacNumber: values.cacNumber,
												nafdacNumber: values.nafdacNumber,
												tinNumber: values.tinNumber,
												sonNumber: values.sonNumber,
											},
										}
										updateProfile(restructureValues);
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
												value={values.firstName}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder='First Name'
												errors={touched.firstName ? errors?.firstName : ''}
											/>
											<TextInput
												type={'text'}
												name='name'
												value={values.lastName}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder='Last Name'
												errors={touched.lastName ? errors?.lastName : ''}
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
												name='nafdacNumber'
												value={values.nafdacNumber}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder='NAFDAC Number'
												errors={errors?.nafdacNumber}
											/>
											<TextInput
												type={'text'}
												name='cacNumber'
												value={values.cacNumber}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder='CAC Number'
												errors={errors?.cacNumber}
											/>
											<TextInput
												type={'text'}
												name='tinNumber'
												value={values.tinNumber}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder='TIN Number'
												errors={errors?.tinNumber}
											/>
											<TextInput
												type={'text'}
												name='sonNumber'
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

										<div className='mt-6 pb-10'>
											<div className='flex items-center justify-center pt-2 space-x-4'>
												<div className='md:w-[138px]'>
													<Button label='Cancel' name='outline' />
												</div>
												<div className='md:w-[138px]'>
													<Button label='Save' type='submit' />
												</div>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</>
					}
				/>

				<SectionCard
					header={<Header header={'Account Details'} />}
					content={
						<Formik
							initialValues={{
								accountProvider: profile?.settlementAccount?.bankName ?? '',
								accountName: profile?.settlementAccount?.accountName ?? '',
								accountNumber: profile?.settlementAccount?.accountNumber ?? '',
							}}
							validationSchema={profileSchema}
							onSubmit={() => {
								//if (!isLoading) {
								//	updateProfile(values);
								//	toast.success('Profile updated successfully');
								//}
							}}
							enableReinitialize
						>
							{({ values, handleBlur, handleChange, errors }) => (
								<Form>
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
											disabled
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
											disabled
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
											disabled
										/>
									</div>
								</Form>
							)}
						</Formik>
					}
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
