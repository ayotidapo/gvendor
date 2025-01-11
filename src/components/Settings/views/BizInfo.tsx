import Radio from '@/atoms/Radio';
import EditInputBox from '@/molecules/EditInputBox';
import EditAddressBox from '@/molecules/EditInputBox/Address';
import EditPhoneBox from '@/molecules/EditInputBox/Phone';
import DialogRadio from '@/onboard/BusinessSetup/views/DialogRadio';
import WorkingDays from '@/onboard/BusinessSetup/views/WorkingDays';
import { useSelector } from '@/redux/hooks';
import { days } from '@/utils/data';
import { ObjectData } from '@/utils/interface';
import { ErrorMessage, Form, Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import { validationSchema } from '@/onboard/BusinessSetup/views/BusinessInfo';

const BizInfo = () => {
	const { businessDetails } = useSelector(state => state?.vendor);
	const { businessName, businessEmail, businessPhonenumber, cacNumber } =
		businessDetails || {};
	const [loading, setLoading] = useState(false);
	console.log({ cacNumber });
	const onSelectLocation = (address: ObjectData) => {};

	return (
		<Formik
			initialValues={{
				businessName,
				lastName: 'vendor?.lastName',
				email: 'vendor?.email',
				businessPhonenumber: `+${businessPhonenumber}`,
				availableHours: [
					...days.map(day => ({
						open: day === 'sunday' ? '' : day,
						openingTime: '',
						closingTime: '',
					})),
				],
				cacNumber: cacNumber,
				isCacNumber: businessDetails?.isCacNumber ? 'y' : 'n',
				tinNumber: cacNumber,
				isTinNumber: businessDetails?.tinNumber === true ? 'y' : 'n',
				isSonNumber: businessDetails?.isSonNumber === true ? 'y' : 'n',
				isNafdacNumber: businessDetails?.isNafdacNumber === true ? 'y' : 'n',
			}}
			onSubmit={async values => {
				try {
					//setLoading(true);
					// await updateVendorApi(values);
					// toast.success(`Profile updated!`);
				} catch (e: any) {
					//toast.error(`Error: ${e.message}`);
				} finally {
					//setLoading(false);
				}
			}}
			validationSchema={validationSchema}
		>
			{({ getFieldProps, setFieldValue, handleBlur, values }) => (
				<Form>
					<h2 className='h2'>Business Information</h2>

					<EditInputBox
						name='businessName'
						title='Business name'
						value={businessName}
					/>

					<EditAddressBox
						title='Business address'
						defaultValue={businessDetails?.businessAddress?.address}
						onSelectLocation={onSelectLocation}
						ctaName='Save'
						submitting={loading}
					/>
					<EditInputBox
						name='businessEmail'
						title='Business email address'
						value={businessEmail}
					/>
					<EditPhoneBox
						name='businessPhonenumber'
						title='Business phone number'
						onChange={() =>
							setFieldValue('businessPhonenumber', values?.businessPhonenumber)
						}
						onBlur={handleBlur}
					/>
					<EditInputBox
						name='category'
						title='Business category'
						value={businessDetails?.servicesOffered?.[0]}
					/>
					<EditInputBox
						name='about'
						title='About business'
						value={businessDetails?.businessDescription}
						type='textarea'
					/>
					<EditInputBox
						name='website'
						title='Business website'
						value={businessDetails?.website}
					/>

					<EditInputBox
						name='*'
						title='Business opening hours'
						displayValue='Click the edit icon to update opening hours'
					>
						{days.map((day, i: number) => (
							<WorkingDays key={day} day={day} index={i} />
						))}
					</EditInputBox>
					<EditInputBox
						name='*'
						title='CAC Number'
						displayValue={cacNumber || 'No CAC number Provided'}
					>
						<DialogRadio
							fName='cacNumber'
							rName='isCacNumber'
							title='Is your business registered with the Corporate Affairs Commission (CAC)?'
						/>
					</EditInputBox>
					<EditInputBox
						name='*'
						title='Tax Identification Number'
						displayValue={
							businessDetails?.tinNumber ||
							'No Tax Identification Number Provided'
						}
					>
						<DialogRadio
							fName='tinNumber'
							rName='isTinNumber'
							title='Does your business have a Tax Identification Number (TIN)?'
						/>
					</EditInputBox>
					<EditInputBox
						name='*'
						title='SON Identification Number'
						displayValue={
							businessDetails?.isSonNumber ||
							'No Tax Identification Number Provided'
						}
					>
						<h3 className='h3'>
							Is your business registered with the Standards Organisation of
							Nigeria (SON)?
						</h3>
						<ErrorMessage
							name='isSonNumber'
							component='div'
							className='error'
						/>
						<label className='block my-3.5'>
							<Radio name='isSonNumber' value='y' formik /> Yes
						</label>
						<label className='block my-3.5'>
							<Radio name='isSonNumber' value='n' formik /> No
						</label>
					</EditInputBox>
					<EditInputBox
						name='*'
						title='SON Identification Number'
						displayValue={
							businessDetails?.nafdacNumber
								? businessDetails?.nafdacNumber
								: 'No Tax Identification Number Provided'
						}
					>
						<h3 className='h3'>Do your items have NAFDAC numbers?</h3>
						<ErrorMessage
							name='isNafdacNumber'
							component='div'
							className='error'
						/>
						<label className='block my-3.5'>
							<Radio name='isNafdacNumber' value='y' formik /> Yes
						</label>
						<label className='block my-3.5'>
							<Radio name='isNafdacNumber' value='n' formik /> No
						</label>
					</EditInputBox>
				</Form>
			)}
		</Formik>
	);
};

export default BizInfo;
