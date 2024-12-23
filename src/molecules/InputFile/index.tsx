import { Icon } from '@/atoms/icon/icon';
import React from 'react';
import './inputfile.scss';

const InputFile = () => {
	return (
		<label className='input_file'>
			<input type='file' className='hidden' />
			<Icon id='picture' width={52} height={44} />
			<span className='text-sm text-[#c2c3c3] mt-2.5'>Upload item image</span>
		</label>
	);
};

export default InputFile;
