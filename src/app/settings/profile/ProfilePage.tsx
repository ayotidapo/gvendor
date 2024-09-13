'use client';

import React, { useState } from 'react';
import { Header } from '@/components/typography/Header';
import TextInput from '@/components/input/TextInput';
import Button from '@/components/buttons/Button';
import { Icon } from '@/components/icon/icon';
import Select from '@/components/select/Select';
import ImageUpload from '@/components/image/ImageUpload';

const ProfilePage = () => {
	const [selectedValue, setSelectedValue] = useState<string | number>('');

	const handleSelectChange = (value: string | number) => {
		setSelectedValue(value);
	};

	const options = [
		{ label: 'Option 1', value: 'option1' },
		{ label: 'Option 2', value: 'option2' },
		{ label: 'Option 3', value: 'option3' },
	];

	return (
		<div className='pt-8'>
			<div>
				<Header header={'Profile picture'} />
			</div>
			<div className='mt-8 flex space-x-10'>
				<div>
					<ImageUpload />
				</div>
				<div className='pt-14'>
					<Button label={'Edit profile'} name={'inverted'}/>
				</div>
			</div>

			<div className='pt-6'>
				<span>
					<Header header={'Profile Information'} />
				</span>
				<span>
					Set up your business as a workspace. Define your industry and business
					description.
				</span>
				<div className='grid grid-cols-2 gap-8 mt-10'>
					<div className='bg-off-white border border-[#EAEAEA] shadow-sm pt-[7px] pl-[20px] flex flex-col rounded-md'>
						<span className='text-secondary-black'>Store name</span>
						<span className='text-black'>Chumbys</span>
					</div>
					<div className='bg-off-white border border-[#EAEAEA] shadow-sm pt-[7px] pl-[20px] flex flex-col rounded-md '>
						<span className='text-secondary-black'>Workshop ID</span>
						<span className='text-black'>WSP1208474</span>
					</div>
					<TextInput type={'text'} name={''} placeholder='Business address' />
					<TextInput type={'text'} name={''} placeholder='Email address' />
					<TextInput type={'text'} name={''} placeholder='Phone number' />
					<TextInput type={'text'} name={''} placeholder='Website url' />
					<Select
						options={options}
						placeholder='Choose industry'
						value={selectedValue}
						onChange={handleSelectChange}
					/>
				</div>
				<div className='mt-6'>
					<TextInput type={'textarea'} name={''} placeholder='Description' />
				</div>
				<div className='mt-6 w-[120px] pb-10'>
					<Button label={'Update'} />
				</div>
			</div>
			<div className='pt-6'>
				<span>
					<Header header={'Bank Account'} className='pb-4' />
				</span>
				<div className='bg-off-white w-[580px] border border-[#EAEAEA] shadow-sm p-[24px] rounded-md flex items-center justify-between'>
					<div className='flex gap-7 items-center'>
						<div className=''>
							<Icon svg={'bank'} />
						</div>
						<div className=''>
							<Header header={'AMOS EDOS OSAMUDIAMEN'} />
							<div className='flex space-x-3 items-center text-sm text-[#000000] md:w-[400px] md:gap-6'>
								<p>FIRST BANK OF NIGERIA</p>
								<p>|</p>
								<p>0001112278</p>
							</div>
						</div>
					</div>
				</div>
				<div className='pt-6 space-y-4 w-[800px] '>
					<TextInput type={'text'} name={''} placeholder='Bank' />
					<TextInput type={'text'} name={''} placeholder='Account name' />
					<TextInput type={'text'} name={''} placeholder='Account number' />
				</div>
				<div className='mt-6 w-[183px]'>
					<Button label={'Add account'} />
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
