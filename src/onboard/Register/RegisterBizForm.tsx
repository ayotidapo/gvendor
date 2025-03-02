import { IAddress, ObjectData } from '@/utils/interface';
import Input from '@/atoms/Input';
import React, { useState } from 'react';
import LocationInput from '@/molecules/LocationInput';
import { Form, useFormikContext } from 'formik';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Link from 'next/link';
import { servicesOfferedOptions } from '@/utils/data';
import { PhoneField } from '@/atoms/PhoneInput';
import { useSelector } from '@/redux/hooks';

const RegisterBizForm: React.FC = () => {
	const { setFieldValue, values, handleBlur, errors, touched } =
		useFormikContext<ObjectData>();

	const vendorUser = useSelector(state => state?.vendor);

	const { loading, businessDetails } = vendorUser;

	const onChangePhone = (value: any) => {
		setFieldValue('phone', value);
	};

	const onSelectLocation = (addressObj: IAddress) => {
		setFieldValue('businessAddress', addressObj);
		SetAddressValue(addressObj?.address);
	};

	const [addressValue, SetAddressValue] = useState(
		businessDetails?.businessAddress?.address
	);

	return (
		<Form className='auth__form'>
			<h2 className='auth_h2'>Register your business with Good!</h2>
			<>
				<div>
					<div className='combine_input wrapper'>
						<Input name='firstName' placeholder='First name' />
						<Input name='lastName' placeholder='Last name' />
					</div>

					<Input name='email' placeholder='Email Address' />
					<PhoneField
						name='phone'
						onChange={onChangePhone}
						// value={values.phone}
						onBlur={handleBlur}
						// error={(errors.phone && touched.phone ? errors.phone : '') as string}
						placeholder='Phone number'
					/>

					<Input name='businessName' placeholder='Business name' />
					<LocationInput
						onSelectLocation={onSelectLocation}
						error={(errors as ObjectData)?.businessAddress?.address}
						value={addressValue}
						onBlur={() => {
							SetAddressValue(values?.businessAddress?.address);
						}}
						onChange={(value: string) => {
							SetAddressValue(value);
						}}
					/>

					<Input
						name='servicesOffered'
						placeholder='Select business type'
						as='select'
						options={servicesOfferedOptions}
					/>
					<Input
						name='website'
						placeholder='Business website or social media link'
					/>
				</div>

				<div className='mt-6'>
					<SimpleBtn disabled={loading}>Sign in</SimpleBtn>
				</div>
				<p className='text-black pt-5 text-center'>
					Already have an account?{' '}
					<Link
						href='/auth/login'
						className='text-[#f45d2c] subpixel-antialiased'
					>
						Submit
					</Link>
				</p>
			</>
		</Form>
	);
};

export default RegisterBizForm;
