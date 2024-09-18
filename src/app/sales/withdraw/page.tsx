'use client'

import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import TextInput from '@/components/input/TextInput';
import Select from '@/components/select/Select';
import PageWrapper from '@/containers/PageWrapper';
import React, { useState } from 'react';

const Withdraw = () => {
	const [selectedValue, setSelectedValue] = useState<string | number>('');

	const handleSelectChange = (value: string | number) => {
		setSelectedValue(value);
	};

	const options = [
		{ label: 'Account 1', value: 'account1' },
		{ label: 'Account 2', value: 'account2' },
		{ label: 'Account 3', value: 'account3' },
	];
	return (
		<PageWrapper pageHeader={'Sales'}>
			<div className='space-y-10'>
				<div className='w-[580px]'>
					<CountCard count={0} text={'WALLET BALANCE'} isCurrency={false} />
				</div>
				<div className='w-[600px] space-y-10'>
					<TextInput type={'text'} placeholder={'Enter amount'} name={''} />
					<Select
						options={options}
						placeholder='Select account'
						value={selectedValue}
						onChange={handleSelectChange}
					/>
					<TextInput
						type={'password'}
						placeholder={'Enter password'}
						name={''}
					/>
				</div>
				<div className=' w-[400px]'>
					<Button label={'Withdraw'} />
				</div>
			</div>
		</PageWrapper>
	);
};

export default Withdraw;
