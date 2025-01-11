import { ObjectData } from '@/utils/interface';
import Input from '@/atoms/Input';
import React, { useState } from 'react';
import LocationInput from '@/molecules/LocationInput';
import { useFormikContext } from 'formik';
import { SimpleBtn } from '@/atoms/buttons/Button';
import Link from 'next/link';
import { servicesOfferedOptions } from '@/utils/data';
import { PhoneField } from '@/atoms/PhoneInput';

interface Props {
	onSelectLocation: (selectLocation: ObjectData) => void;
	submitting: boolean;
}
const RegisterBizForm: React.FC<Props> = props => {
	const { setFieldValue, values, handleBlur, errors, touched } =
		useFormikContext<ObjectData>();

	const onChangePhone = (value: any) => {
		setFieldValue('phone', value);
	};

	const address_error = errors.businessAddress as string;
	return (
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
					onSelectLocation={props.onSelectLocation}
					error={address_error}
				/>
				<div className=' -translate-y-5 error'>{address_error}</div>

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
				<SimpleBtn disabled={props.submitting}>Sign in</SimpleBtn>
			</div>
			<p className='text-black pt-5 text-center'>
				Already have an account?{' '}
				<Link
					href='/auth/login'
					className='text-[#f45d2c] subpixel-antialiased'
				>
					Sign in
				</Link>
			</p>
		</>
	);
};

export default RegisterBizForm;
