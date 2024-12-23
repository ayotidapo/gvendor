import Radio from '@/atoms/Radio';
import Select from '@/atoms/Select';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Input } from '@/atoms/Input/Input';
import InputFile from '@/molecules/InputFile';
import React from 'react';

const UploadItem = () => {
	return (
		<>
			<h3 className='h3 text-xl mb-4'>Upload items You&apos;d Like To Sell</h3>
			<InputFile />
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
			/>
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
			<Input
				value=''
				onChange={() => null}
				error=''
				name=''
				type='text'
				placeholder='Email address'
			/>
			<SimpleBtn className='normal'>Save & Continue</SimpleBtn>
		</>
	);
};

export default UploadItem;
