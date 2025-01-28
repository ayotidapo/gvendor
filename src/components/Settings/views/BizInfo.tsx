import Radio from '@/atoms/Radio';
import EditInputBox from '@/molecules/EditInputBox';
import EditAddressBox from '@/molecules/EditInputBox/Address';
import EditPhoneBox from '@/molecules/EditInputBox/Phone';
import DialogRadio from '@/onboard/BusinessSetup/views/DialogRadio';
import WorkingDays from '@/onboard/BusinessSetup/views/WorkingDays';
import { useDispatch, useSelector } from '@/redux/hooks';
import { days } from '@/utils/data';
import { IAddress, ObjectData } from '@/utils/interface';
import { ErrorMessage, Form, Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import { validationSchema } from '@/onboard/BusinessSetup/views/BusinessInfo';
import { updateBiz, updateBizApi } from '@/redux/apis/business';
import { toast } from 'react-toastify';

const BizInfo = () => {
	const { businessDetails } = useSelector(state => state?.vendor);
	const { loading } = useSelector(state => state?.business);
	const dispatch = useDispatch();
	const { businessName, availableHours, businessPhonenumber, cacNumber } =
		businessDetails || {};

	const [addressValue, SetAddressValue] = useState(
		businessDetails?.businessAddress?.address
	);

	return (
		<Formik
			initialValues={{
				businessName,
				businessPhonenumber: `+${businessPhonenumber}`,
				businessAddress: {
					address: businessDetails?.businessAddress?.address,
					...businessDetails?.businessAddress,
				},
				businessEmail: businessDetails?.businessEmail || '',
				businessDescription: businessDetails?.businessDescription || '',
				website: businessDetails?.website || '',
				nafdacNumber: businessDetails?.nafdacNumber || '',
				sonNumber: businessDetails?.sonNumber || '',
				availableHours: [
					...Object.keys(availableHours)?.map(day => ({
						open: availableHours?.[day].open,
						openingTime: availableHours?.[day].openingTime || '',
						closingTime: availableHours?.[day].closingTime || '',
					})),
				],
				servicesOffered: businessDetails?.servicesOffered?.[0] || [],
				cacNumber: cacNumber,
				isCacNumber: businessDetails?.isCacNumber ? 'y' : 'n',
				tinNumber: cacNumber,
				isTinNumber: businessDetails?.tinNumber === true ? 'y' : 'n',
				isSonNumber: businessDetails?.isSonNumber === true ? 'y' : 'n',
				isNafdacNumber: businessDetails?.isNafdacNumber === true ? 'y' : 'n',
			}}
			onSubmit={values => {
				const {
					isCacNumber,
					isTinNumber,
					businessAddress,
					isNafdacNumber: is_NafdacNumber,
					isSonNumber: is_SonNumber,
					businessEmail,
					...restValues
				} = values;

				const isNafdacNumber = is_NafdacNumber === 'y' ? true : false;
				const isSonNumber = is_SonNumber === 'y' ? true : false;

				const mappedHours = values?.availableHours?.reduce((acc, cur, i) => {
					if (!cur?.openingTime) delete (cur as any)?.openingTime;
					if (!cur?.closingTime) delete (cur as any)?.closingTime;
					return {
						...acc,
						[days[i]]: { ...cur, open: !!cur.open },
					};
				}, {});

				const payload = {
					...restValues,
					businessAddress,
					availableHours: mappedHours,
					servicesOffered: [values?.servicesOffered],
					isNafdacNumber,
					isSonNumber,
					businessPhonenumber: values?.businessPhonenumber?.replace('+', ''),
				};

				dispatch(updateBiz(payload)).then(result => {
					if (result.type === 'vendor/updateBiz/fulfilled') {
						toast.success('Business information successfully updated');
					} else {
						toast.error(`business information update fails`);
					}
				});
			}}
			validationSchema={validationSchema}
		>
			{({ setFieldValue, handleBlur, handleChange, values, ...rest }) => {
				console.log({ values, ...rest });
				const errors = rest.errors as Record<string, string>;
				return (
					<Form>
						<h2 className='h2 text-black'>Business Information</h2>

						<EditInputBox
							ctaName='Save'
							name='businessName'
							title='Business name'
							value={values?.businessName}
							error={errors?.businessName}
							deactivate
							submitting={loading}
							onChange={handleChange}
						/>

						<EditAddressBox
							title='Business address'
							onSelectLocation={addressObj => {
								setFieldValue('businessAddress', addressObj);
								SetAddressValue(addressObj?.address);
							}}
							onBlur={() => {
								SetAddressValue(values?.businessAddress?.address);
							}}
							onChange={(value: string) => {
								SetAddressValue(value);
							}}
							value={addressValue}
							error={(errors?.businessAddress as any)?.address}
							ctaName='Save'
							submitting={loading}
						/>
						<EditInputBox
							ctaName='Save'
							name='businessEmail'
							title='Business email address'
							value={values?.businessEmail}
							error={errors?.businessEmail}
							submitting={loading}
							onChange={handleChange}
						/>
						<EditPhoneBox
							name='businessPhonenumber'
							title='Business phone number'
							onChange={(val: string) =>
								setFieldValue('businessPhonenumber', val)
							}
							onBlur={handleBlur}
							submitting={loading}
						/>
						<EditInputBox
							ctaName='Save'
							name='category'
							title='Business category'
							value={values?.servicesOffered}
							error={errors?.category}
							submitting={loading}
							onChange={handleChange}
						/>
						<EditInputBox
							ctaName='Save'
							name='businessDescription'
							title='About business'
							value={values?.businessDescription}
							error={errors?.businessDescription}
							type='textarea'
							submitting={loading}
							onChange={handleChange}
						/>
						<EditInputBox
							ctaName='Save'
							name='website'
							title='Business website'
							value={values?.website}
							error={errors?.website}
							submitting={loading}
							onChange={handleChange}
						/>

						<EditInputBox
							ctaName='Save'
							name='*'
							title='Business opening hours'
							displayValue='Click the edit icon to update opening hours'
							submitting={loading}
							onChange={handleChange}
						>
							{days.map((day, i: number) => (
								<WorkingDays key={day} day={day} index={i} toEdit />
							))}
						</EditInputBox>
						<EditInputBox
							ctaName='Save'
							name='*'
							title='CAC Number'
							displayValue={cacNumber || 'No CAC number Provided'}
							submitting={loading}
							onChange={handleChange}
						>
							<DialogRadio
								fName='cacNumber'
								rName='isCacNumber'
								title='Is your business registered with the Corporate Affairs Commission (CAC)?'
							/>
						</EditInputBox>
						<EditInputBox
							ctaName='Save'
							name='*'
							title='Tax Identification Number'
							displayValue={
								values?.tinNumber || 'No Tax Identification Number Provided'
							}
							submitting={loading}
							onChange={handleChange}
						>
							<DialogRadio
								fName='tinNumber'
								rName='isTinNumber'
								title='Does your business have a Tax Identification Number (TIN)?'
							/>
						</EditInputBox>
						<EditInputBox
							ctaName='Save'
							name='*'
							title='SON Identification Number'
							displayValue={
								values?.sonNumber && values?.isSonNumber === 'y'
									? values?.sonNumber
									: 'No SON Number Provided'
							}
							submitting={loading}
							onChange={handleChange}
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
							ctaName='Save'
							name='*'
							title='NAFDAC Number'
							displayValue={
								values?.nafdacNumber && values?.isNafdacNumber === 'y'
									? values?.nafdacNumber
									: 'No NAFDAC Number Provided'
							}
							submitting={loading}
							onChange={handleChange}
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
				);
			}}
		</Formik>
	);
};

export default BizInfo;
