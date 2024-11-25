import Radio from '@/atoms/Radio';
import Select from '@/atoms/Select';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/input/Input';
import React from 'react';

const BankDetails = () => {
	return (
		<>
			<h3 className='h3 text-xl mb-4'>Bank Account details</h3>
			<Input
				value=''
				onChange={() => null}
				errors=''
				name=''
				type='text'
				placeholder='Email address'
			/>
			<Input
				value=''
				onChange={() => null}
				errors=''
				name=''
				type='text'
				placeholder='Email address'
			/>

			<Input
				value=''
				onChange={() => null}
				errors=''
				name=''
				type='text'
				placeholder='Email address'
			/>

			<SimpleBtn className='normal'>Save & Continue</SimpleBtn>
		</>
	);
};

export default BankDetails;
