import React from 'react';
// import * as Yup from 'yup';
import AddressInput from '@/components/common/AddressInput';
import CheckboxInput from '@/components/common/Checkbox';
import TextInput from '@/components/input/TextInput';
import { Formik, Form } from 'formik';
import Button from '@/components/buttons/Button';
import { ProfileData } from '@/redux/profile/profile.type';
import { useCreateProfileMutation } from '@/redux/profile/profile.slice';

const servicesOfferedOptions = [
	{ value: 'food', label: 'Food' },
	{ value: 'electronics', label: 'Electronics' },
	{
		value: 'clothes, shoes & accessories',
		label: 'Clothes, shoes & accessories',
	},
	{ value: 'hospitality', label: 'Hospitality' },
	{
		value: 'office supplies, paper and paper products',
		label: 'Office supplies, paper and paper products',
	},
	{ value: 'scents', label: 'Scents' },
	{
		value: 'personalized branding & gifting',
		label: 'Personalized Branding & Gifting',
	},
	{ value: 'catering', label: 'Catering' },
	{ value: 'travel & tours', label: 'Travel & tours' },
	{ value: 'marketing & advertising', label: 'Marketing & advertising' },
	{ value: 'furniture', label: 'Furniture' },
	{ value: 'learning and development', label: 'Learning and development' },
	{ value: 'other', label: 'Other' },
];

const businessStructureOptions = [
	{ value: 'sole proprietorship', label: 'Sole Proprietorship' },
	{ value: 'partnership', label: 'Partnership' },
	{ value: 'limited liability company', label: 'Limited Liability Company' },
	{ value: 'corporation', label: 'Corporation' },
	{ value: 'privacy-related concerns', label: 'Privacy-related concerns' },
];

//const profileSchema = Yup.object({
//	businessName: Yup.string().required('Business name is required'),
//	businessAddress: Yup.object().shape({
//		address: Yup.string().required('Business address is required'),
//		longitude: Yup.number().required('Longitude is required'),
//		latitude: Yup.number().required('Latitude is required'),
//		sourceGooglePlaceID: Yup.string().required('Source Google Place ID is required'),
//	}),
//	email: Yup.string().required('Email address is required'),
//	phone: Yup.string().required('Phone number is required'),
//	website: Yup.string().required('Website URL is required'),
//	description: Yup.string().required('Business description is required'),
//	servicesOffered: Yup.array().of(Yup.string()).required('Services offered is required'),
//	socialMediaLinks: Yup.array().of(Yup.string()).required('Social media links is required'),
//	annualTurnOver: Yup.number().required('Annual turnover is required'),
//	registeredWithCAC: Yup.string().required('CAC registration is required'),
//	cacNumber: Yup.string().when('registeredWithCAC', (registeredWithCAC, schema) => {
//		const registeredValue = Array.isArray(registeredWithCAC) ? registeredWithCAC[0] : registeredWithCAC;

//		return registeredValue === 'yes'
//			? schema.required('CAC number is required')
//			: schema;
//	}),
//	registeredWithNAFDAC: Yup.string().required('NAFDAC registration is required'),
//	nafdacNumber: Yup.string().when('registeredWithNAFDAC', (registeredWithNAFDAC, schema) => {
//		const registeredValue = Array.isArray(registeredWithNAFDAC) ? registeredWithNAFDAC[0] : registeredWithNAFDAC;

//		return registeredValue === 'yes'
//			? schema.required('NAFDAC number is required')
//			: schema;
//	}),
//	registeredWithTIN: Yup.string().required('TIN registration is required'),
//	tinNumber: Yup.string().when('registeredWithTIN', (registeredWithTIN, schema) => {
//		const registeredValue = Array.isArray(registeredWithTIN) ? registeredWithTIN[0] : registeredWithTIN;

//		return registeredValue === 'yes'
//			? schema.required('TIN number is required')
//			: schema;
//	}),
//	registeredWithSON: Yup.string().required('SON registration is required'),
//	sonNumber: Yup.string().when('registeredWithSON', (registeredWithSON, schema) => {
//		const registeredValue = Array.isArray(registeredWithSON) ? registeredWithSON[0] : registeredWithSON;

//		return registeredValue === 'yes'
//			? schema.required('SON number is required')
//			: schema;
//	}),
//	businessStructure: Yup.string().required('Business structure is required'),
//	yearsOfExperince: Yup.string().required('Years of experience is required'),
//});

const CreateBusinessForm = ({
	profile,
	isLoading,
	step,
	setStep,
}: {
	profile: ProfileData;
	isLoading: boolean;
	setStep: (step: number) => void;
	step: number;
}) => {
	const [updateProfile] = useCreateProfileMutation();

	return (
		<Formik
			initialValues={{
				name: profile?.name ?? '',
				address: profile?.businessDetails?.businessAddress ?? {
					address: '',
					latitude: 0,
					longitude: 0,
					sourceGooglePlaceID: '',
				},
				email: profile?.email ?? '',
				phone: profile?.phone ?? '',
				website: profile?.website ?? '',
				description: profile?.description ?? '',
				servicesOffered: profile?.businessDetails?.servicesOffered ?? [],
				yearsOfExperince: profile?.businessDetails?.yearsOfExperince ?? '',
				businessStructure: profile?.businessDetails?.businessStructure ?? '',
				nameOfPrimaryContact:
					profile?.businessDetails?.nameOfPrimaryContact ?? '',
				positionOfPrimaryContact:
					profile?.businessDetails?.positionOfPrimaryContact ?? '',
				socialMediaLinks:
					profile?.businessDetails?.socialMediaLinks.join() ?? '',
				registeredWithCAC: '',
				cacNumber: profile?.businessDetails?.cacNumber ?? '',
				registeredWithNAFDAC: '',
				nafdacNumber: profile?.businessDetails?.nafdacNumber ?? '',
				registeredWithTIN: '',
				tinNumber: profile?.businessDetails?.tinNumber ?? '',
				registeredWithSON: '',
				sonNumber: profile?.businessDetails?.sonNumber ?? '',
				annualTurnOver:
					profile?.businessDetails?.annualTurnOver.toString() ?? '',
			}}
			// validationSchema={profileSchema}
			onSubmit={async values => {
				if (!isLoading) {
					const businessData = {
						//nameOfPrimaryContact: values.nameOfPrimaryContact,
						//positionOfPrimaryContact: values.positionOfPrimaryContact,
						businessName: values.name,
						businessAddress: values.address,
						website: values.website,
						socialMediaLinks: values.socialMediaLinks.split(','),
						servicesOffered: values.servicesOffered,
						businessStructure: values.businessStructure,
						yearsOfExperince: values.yearsOfExperince,
						annualTurnOver: +values.annualTurnOver,
						cacNumber: values.cacNumber,
						nafdacNumber: values.nafdacNumber,
						tinNumber: values.tinNumber,
						sonNumber: values.sonNumber,
					};
					const res = await updateProfile(businessData);

					if (res.data) {
						setStep(3);
					}
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
				<Form className='pt-6 flex flex-col space-y-4 max-w-4xl'>
					{JSON.stringify(errors)}
					{step === 1 && (
						<div className='pt-3 flex flex-col space-y-6'>
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
							/>

							<TextInput
								type={'text'}
								name='nameOfPrimaryContact'
								value={values.nameOfPrimaryContact}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Name of primary contact'
								errors={
									touched.nameOfPrimaryContact
										? errors?.nameOfPrimaryContact
										: ''
								}
							/>

							<TextInput
								type={'text'}
								name='positionOfPrimaryContact'
								value={values.positionOfPrimaryContact}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Position of primary contact'
								errors={
									touched.positionOfPrimaryContact
										? errors?.positionOfPrimaryContact
										: ''
								}
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
								name='socialMediaLinks'
								value={values.socialMediaLinks}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='Active social media links'
							/>
							<div>
								<label
									htmlFor='servicesOffered'
									className='text-default-gray font-semibold block mb-2'
								>
									Select type(s) of products/services offered
								</label>
								<div className='grid grid-cols-2 gap-4'>
									{servicesOfferedOptions.map(option => (
										<CheckboxInput
											name='servicesOffered'
											key={option.value}
											checked={values.servicesOffered.includes(option.value)}
											onChange={() => {
												const updatedServices = values.servicesOffered.includes(
													option.value
												)
													? values.servicesOffered.filter(
															service => service !== option.value
														)
													: [...values.servicesOffered, option.value];
												setFieldValue('servicesOffered', updatedServices);
											}}
											label={option.label}
										/>
									))}
								</div>
							</div>
							<TextInput
								type={'text'}
								name='yearsOfExperince'
								value={values.yearsOfExperince}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder='How long have you been in this type of business?'
								errors={errors?.yearsOfExperince}
							/>
							<div>
								<label
									htmlFor='businessStructure'
									className='text-default-gray font-semibold block mb-2'
								>
									Select type(s) of products/services offered
								</label>
								<div className='space-y-2'>
									{businessStructureOptions.map(option => (
										<div
											key={option.value}
											className='flex items-center space-x-2'
										>
											<input
												type='radio'
												name='businessStructure'
												value={option.value}
												checked={values.businessStructure === option.value}
												onChange={handleChange}
												onBlur={handleBlur}
												className='text-blue-500'
											/>
											<label className='text-gray-500'>{option.label}</label>
										</div>
									))}
								</div>
							</div>
							<div>
								<TextInput
									type={'text'}
									name='annualTurnOver'
									value={values.annualTurnOver}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Annual turnover of your company (in Naira)'
									errors={errors?.annualTurnOver}
								/>
								<p className='mt-2'>
									This information will be treated with utmost confidentiality
								</p>
							</div>

							<div className='mt-6 w-full md:w-[120px] pb-10'>
								<Button
									onClick={() => setStep(2)}
									label={'Continue'}
									type='button'
								/>
							</div>
						</div>
					)}

					{step === 2 && (
						<div className='mt-6 space-y-6'>
							<div className='space-y-4'>
								<label
									htmlFor='registeredWithCAC'
									className='text-default-gray font-semibold block mb-2'
								>
									Is your business registered with CAC?
								</label>
								<div className='space-y-2'>
									<div className='flex items-center space-x-2'>
										<input
											type='radio'
											name='registeredWithCAC'
											value='yes'
											checked={values.registeredWithCAC === 'yes'}
											onChange={handleChange}
											onBlur={handleBlur}
											className='text-blue-500'
										/>
										<label className='text-gray-500'>Yes</label>
									</div>
									<div className='flex items-center space-x-2'>
										<input
											type='radio'
											name='registeredWithCAC'
											value='no'
											checked={values.registeredWithCAC === 'no'}
											onChange={handleChange}
											onBlur={handleBlur}
											className='text-blue-500'
										/>
										<label className='text-gray-500'>No</label>
									</div>
								</div>
								<TextInput
									type='text'
									name='cacNumber'
									value={values.cacNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='If yes, please enter your CAC number'
									errors={errors?.cacNumber}
								/>
							</div>

							<div className='space-y-4'>
								<label
									htmlFor='registeredWithNAFDAC'
									className='text-default-gray font-semibold block mb-2'
								>
									Is your business registered with NAFDAC?
								</label>
								<div className='space-y-2'>
									<div className='flex items-center space-x-2'>
										<input
											type='radio'
											name='registeredWithNAFDAC'
											value='yes'
											checked={values.registeredWithNAFDAC === 'yes'}
											onChange={handleChange}
											onBlur={handleBlur}
											className='text-blue-500'
										/>
										<label className='text-gray-500'>Yes</label>
									</div>
									<div className='flex items-center space-x-2'>
										<input
											type='radio'
											name='registeredWithNAFDAC'
											value='no'
											checked={values.registeredWithNAFDAC === 'no'}
											onChange={handleChange}
											onBlur={handleBlur}
											className='text-blue-500'
										/>
										<label className='text-gray-500'>No</label>
									</div>
								</div>
								<TextInput
									type='text'
									name='nafdacNumber'
									value={values.nafdacNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='If yes, please fill your NAFDAC number'
									errors={errors?.nafdacNumber}
								/>
							</div>

							<div className='space-y-4'>
								<label
									htmlFor='registeredWithTIN'
									className='text-default-gray font-semibold block mb-2'
								>
									Is your business registered with Tax Identification Number
									(TIN)?
								</label>
								<div className='space-y-2'>
									<div className='flex items-center space-x-2'>
										<input
											type='radio'
											name='registeredWithTIN'
											value='yes'
											checked={values.registeredWithTIN === 'yes'}
											onChange={handleChange}
											onBlur={handleBlur}
											className='text-blue-500'
										/>
										<label className='text-gray-500'>Yes</label>
									</div>
									<div className='flex items-center space-x-2'>
										<input
											type='radio'
											name='registeredWithTIN'
											value='no'
											checked={values.registeredWithTIN === 'no'}
											onChange={handleChange}
											onBlur={handleBlur}
											className='text-blue-500'
										/>
										<label className='text-gray-500'>No</label>
									</div>
								</div>
								<TextInput
									type='text'
									name='tinNumber'
									value={values.tinNumber}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='If yes, please fill your TIN'
									errors={errors?.tinNumber}
								/>
							</div>

							<div className='space-y-4'>
								<label
									htmlFor='registeredWithSON'
									className='text-default-gray font-semibold block mb-2'
								>
									Is your business registered with SON?
								</label>
								<div className='space-y-2'>
									<div className='flex items-center space-x-2'>
										<input
											type='radio'
											name='registeredWithSON'
											value='yes'
											checked={values.registeredWithSON === 'yes'}
											onChange={handleChange}
											onBlur={handleBlur}
											className='text-blue-500'
										/>
										<label className='text-gray-500'>Yes</label>
									</div>
									<div className='flex items-center space-x-2'>
										<input
											type='radio'
											name='registeredWithSON'
											value='no'
											checked={values.registeredWithSON === 'no'}
											onChange={handleChange}
											onBlur={handleBlur}
											className='text-blue-500'
										/>
										<label className='text-gray-500'>No</label>
									</div>
								</div>
								<TextInput
									type='text'
									value={values.sonNumber}
									name='sonNumber'
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='If yes, please fill your SON'
									errors={errors?.sonNumber}
								/>
							</div>

							<div className='mt-6 w-full md:w-[120px] pb-10'>
								<Button label={'Update'} type='submit' />
							</div>
						</div>
					)}
				</Form>
			)}
		</Formik>
	);
};

export default CreateBusinessForm;
