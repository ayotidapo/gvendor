import Radio from '@/atoms/Radio';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Input from '@/atoms/Input';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { days, servicesOfferedOptions } from '@/utils/data';
import { ErrorMessage, Form, Formik } from 'formik';
import DialogRadio from './DialogRadio';
import LocationInput from '@/molecules/LocationInput';
import { useDispatch } from '@/redux/hooks';
import { updateBiz } from '@/redux/apis/business';
import WorkingDays from './WorkingDays';
import { useSelector } from '@/redux/hooks';
import { PhoneField } from '@/atoms/PhoneInput';

export const validationSchema = Yup.object({
	businessName: Yup.string().required('Business name is Required'),
	businessAddress: Yup.object().shape({
		address: Yup.string().required('Address is required'),
		longitude: Yup.mixed(),
		latitude: Yup.mixed(),
	}),
	businessDescription: Yup.string().required('Tell us about your business'),
	businessEmail: Yup.string()
		.email('Enter valid email address')
		.required('Email is Required'),
	servicesOffered: Yup.string().required('Select business type'),
	businessPhonenumber: Yup.string()
		.required('Phone number is required')
		.min(14, ' Enter valid phone number')
		.max(15, ' Enter valid phone number'),
	website: Yup.string().required('Enter a valid link'),
	cacNumber: Yup.string().when('isCacNumber', {
		is: (value: string) => value === 'n',
		then: schema => schema.notRequired(),
		otherwise: schema => schema.required('Enter your CAC number'),
	}),

	tinNumber: Yup.string().when('isTinNumber', {
		is: (value: string) => value === 'n',
		then: schema => schema.notRequired(),
		otherwise: schema => schema.required('Enter your TIN number'),
	}),

	isSonNumber: Yup.string().required('select an option'),
	isNafdacNumber: Yup.string().required('select an option'),
	availableHours: Yup.array().of(
		Yup.object().shape({
			open: Yup.string(),
			openingTime: Yup.string().when('open', {
				is: (value: string) => !value,
				then: schema => schema.notRequired(),
				otherwise: schema => schema.required('Opening time is required'),
			}),
			closingTime: Yup.string().when('open', {
				is: (value: string) => !value,
				then: schema => schema.notRequired(),
				otherwise: schema => schema.required('Closing time is required'),
			}),
		})
	),
});

interface Props {
	setStep: (step: number) => void;
}
const BusinessInfo: React.FC<Props> = props => {
	const dispatch = useDispatch();
	const { isSuccess, loading } = useSelector(state => state?.business);
	const { businessName, businessDetails } = useSelector(state => state?.vendor);

	const [addressValue, SetAddressValue] = useState(
		businessDetails?.businessAddress?.address
	);

	if (isSuccess) {
		props.setStep(1);
	}

	return (
		<>
			<h3 className='h3 text-xl mb-4'>Business details</h3>

			<Formik
				initialValues={{
					businessName,
					businessAddress: {
						address: businessDetails?.businessAddress?.address,
						...businessDetails?.businessAddress,
					},
					businessEmail: '',
					businessPhonenumber: '',
					servicesOffered: '',
					businessDescription: '',
					website: '',
					cacNumber: '',
					tinNumber: '',
					isSonNumber: '',
					isNafdacNumber: '',
					isCacNumber: '',
					isTinNumber: '',
					availableHours: [
						...days.map(day => ({
							open: day === 'sunday' ? '' : day,
							openingTime: '',
							closingTime: '',
						})),
					],
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

					dispatch(updateBiz(payload));
				}}
				validationSchema={validationSchema}
			>
				{({ values, errors, setFieldValue, handleBlur }) => {
					return (
						<Form>
							<Input
								name='businessName'
								placeholder='Enter business name'
								// readOnly
							/>

							<LocationInput
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
							/>
							<div className='combine_input'>
								<Input
									name='businessEmail'
									placeholder='Enter business email'
								/>
								<PhoneField
									name='businessPhonenumber'
									onChange={(val: string) => {
										setFieldValue('businessPhonenumber', val);
									}}
									onBlur={handleBlur}
									placeholder='Phone number'
								/>
							</div>
							<Input
								name='servicesOffered'
								placeholder='Select business type'
								as='select'
								options={servicesOfferedOptions}
							/>
							<Input
								name='businessDescription'
								as='textarea'
								rows={5}
								placeholder='Tell us about your business'
							/>
							<Input name='website' placeholder='Enter your website' />

							{days.map((day, i: number) => (
								<WorkingDays key={day} day={day} index={i} />
							))}

							<DialogRadio
								fName='cacNumber'
								rName='isCacNumber'
								title='Is your business registered with the Corporate Affairs Commission (CAC)?'
							/>
							<DialogRadio
								fName='tinNumber'
								rName='isTinNumber'
								title='Does your business have a Tax Identification Number (TIN)?'
							/>

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
							<SimpleBtn className='normal' disabled={loading}>
								Save & Continue
							</SimpleBtn>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default BusinessInfo;
