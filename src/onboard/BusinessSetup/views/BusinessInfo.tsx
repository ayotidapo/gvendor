import Radio from '@/atoms/Radio';
import Select from '@/atoms/Select';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/input/Input';
import React from 'react';

const BusinessInfo = () => {
	return (
		<>
			<h3 className='h3 text-xl mb-4'>Business details</h3>
			<Input
				value=''
				onChange={() => null}
				error=''
				name=''
				type='text'
				placeholder='Email address'
			/>
			<Input
				value=''
				onChange={() => null}
				error=''
				name=''
				type='text'
				placeholder='Email address'
			/>
			<div className='combine_input'>
				<Input
					value=''
					onChange={() => null}
					error=''
					name=''
					type='text'
					placeholder='Email address'
				/>
				<Input
					value=''
					onChange={() => null}
					error=''
					name=''
					type='text'
					placeholder='Email address'
				/>
			</div>
			<Input
				value=''
				onChange={() => null}
				error=''
				name=''
				type='text'
				placeholder='Email address'
			/>
			<Input
				value=''
				onChange={() => null}
				error=''
				name=''
				type='textarea'
				placeholder='Email address'
				rows={5}
			/>
			<Input
				value=''
				onChange={() => null}
				error=''
				name=''
				type='text'
				placeholder='Email address'
			/>
			<div className='combine_input'>
				<Select
					options={[
						{ label: 'Monday', value: 'mon' },
						{ label: 'Tuesday', value: 'tue' },
					]}
					value='tue'
					onChange={() => null}
				/>
				<Select
					options={[
						{ label: 'Monday', value: 'mon' },
						{ label: 'Tuesday', value: 'tue' },
					]}
					value='tue'
					onChange={() => null}
				/>
			</div>
			<div className='combine_input '>
				<Select
					options={[
						{ label: 'Monday', value: 'mon' },
						{ label: 'Tuesday', value: 'tue' },
					]}
					value='tue'
					onChange={() => null}
				/>
				<Select
					options={[
						{ label: 'Monday', value: 'mon' },
						{ label: 'Tuesday', value: 'tue' },
					]}
					value='tue'
					onChange={() => null}
				/>
			</div>
			<h3 className='h3'>
				Does your business have a Tax Identification Number (TIN)?
			</h3>

			<label className='block my-3.5'>
				<Radio /> Yes
			</label>
			<label className='block  my-3.5'>
				<Radio /> No
			</label>
			<h3 className='h3'>
				Is your business registered with the Standards Organisation of Nigeria
				(SON)?
			</h3>
			<label className='block my-3.5'>
				<Radio /> Yes
			</label>
			<label className='block my-3.5'>
				<Radio /> No
			</label>
			<h3 className='h3'>Do your items have NAFDAC numbers?</h3>
			<label className='block my-3.5'>
				<Radio /> Yes
			</label>
			<label className='block my-3.5'>
				<Radio /> No
			</label>
			<SimpleBtn className='normal'>Save & Continue</SimpleBtn>
		</>
	);
};

export default BusinessInfo;
