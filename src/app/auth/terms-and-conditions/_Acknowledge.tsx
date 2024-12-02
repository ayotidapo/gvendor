'use client';

import { SimpleBtn } from '@/atoms/buttons/Button';
import Checkbox from '@/atoms/Checkbox';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const _Acknowledge = () => {
	const router = useRouter();
	const [enable, setEnable] = useState(true);
	return (
		<>
			<p className='flex mt-7'>
				<Checkbox
					name='accept'
					value='accept'
					className='square'
					onChange={() => setEnable(enable => !enable)}
				/>{' '}
				I acknowledge that I have read and understood the information above.
			</p>
			<SimpleBtn
				className='cont_'
				disabled={enable}
				onClick={() => router.replace(`/business-setup`)}
			>
				Continue
			</SimpleBtn>
		</>
	);
};

export default _Acknowledge;
