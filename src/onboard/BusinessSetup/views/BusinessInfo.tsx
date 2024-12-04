import Radio from '@/atoms/Radio';
import Select from '@/atoms/Select';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Input, { PhoneField } from '@/atoms/Input';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { days, servicesOfferedOptions, weekDays } from '@/utils/data';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { ErrorMessage, Form, Formik } from 'formik';
import DialogRadio from './DialogRadio';
import LocationInput from '@/molecules/LocationInput';
import { IAddress, ObjectData } from '@/utils/interface';
import { useDispatch } from '@/redux/hooks';
import { createBiz } from '@/redux/apis/business';
import WorkingDays from './WorkingDays';

type Value = string | null;

const validationSchema = Yup.object({
	businessName: Yup.string().required('Business name is Required'),
	businessAddress: Yup.string(),
	businessDescription: Yup.string(),
	email: Yup.string()
		.email('Enter valid email address')
		.required('Email is Required'),
	servicesOffered: Yup.string().required('Select business type'),
	businessPhonenumber: Yup.string()
		.required('Phone number is required')
		.min(11, ' Enter valid phone number')
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

	sonNumber: Yup.string().required('select an option'),
	nafdacNumber: Yup.string().required('select an option'),
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
				otherwise: schema => schema.required('Opening time is required'),
			}),
		})
	),
});
const BusinessInfo = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState<Record<string, Value>>({
		openingTime: '',
		closingTime: '',
	});
	const [address, SetAddress] = useState<IAddress>({});

	const onSelectLocation = (selectLocation: ObjectData) => {
		SetAddress(selectLocation);
	};

	const onSetTime = (name: string, val: Value) => {
		setValue({ ...value, [name]: val });
	};

	return (
		<>
			<h3 className='h3 text-xl mb-4'>Business details</h3>

			<Formik
				initialValues={{
					businessName: '',
					businessAddress: '',
					email: '',
					businessPhonenumber: '',
					servicesOffered: '',
					businessDescription: '',
					website: '',
					cacNumber: '',
					tinNumber: '',
					sonNumber: '',
					nafdacNumber: '',
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
				onSubmit={(values, { setErrors }) => {
					if (!address?.address) {
						setErrors({ businessAddress: 'Address is required' });
						return;
					}
					const mappedHours = values?.availableHours?.reduce(
						(acc, cur, i) => ({
							...acc,
							[days[i]]: { ...cur, open: !!cur.open },
						}),
						{}
					);
					console.log(mappedHours, 'yup');
					const payload = {
						...values,
						businessAddress: { ...address },
						availableHours: mappedHours,
					};
					console.log(payload);
					dispatch(createBiz(payload));
				}}
				validationSchema={validationSchema}
			>
				{({ values, errors, touched, setFieldValue, handleBlur }) => {
					console.log({ values, errors, touched });
					return (
						<Form>
							<Input name='businessName' placeholder='Enter business name' />

							<LocationInput
								onSelectLocation={onSelectLocation}
								error={errors?.businessAddress}
							/>
							<div className='combine_input'>
								<Input name='email' placeholder='Enter business email' />
								<PhoneField
									name='businessPhonenumber'
									onChange={(val: any) => {
										setFieldValue('businessPhonenumber', val);
									}}
									className='ooooo'
									value={values?.businessPhonenumber}
									onBlur={handleBlur}
									error={
										(errors.businessPhonenumber && touched.businessPhonenumber
											? errors.businessPhonenumber
											: '') as string
									}
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
								name='sonNumber'
								component='div'
								className='error'
							/>
							<label className='block my-3.5'>
								<Radio name='sonNumber' value='y' formik /> Yes
							</label>
							<label className='block my-3.5'>
								<Radio name='sonNumber' value='n' formik /> No
							</label>
							<h3 className='h3'>Do your items have NAFDAC numbers?</h3>
							<ErrorMessage
								name='nafdacNumber'
								component='div'
								className='error'
							/>
							<label className='block my-3.5'>
								<Radio name='nafdacNumber' value='y' formik /> Yes
							</label>
							<label className='block my-3.5'>
								<Radio name='nafdacNumber' value='n' formik /> No
							</label>
							<SimpleBtn className='normal'>Save & Continue</SimpleBtn>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default BusinessInfo;
