import { Icon } from '@/atoms/icon/icon';
import React from 'react';
import './footer.scss';

const OnboardFooter = () => {
	return (
		<footer className='onboard_footer'>
			<span className='mr-10'>
				&copy; 2024 The Good Thing Company. All Rights Reserved.
			</span>
			<span>Why Good? | Are you an exceptional creator? | Get help</span>
			<div className='flex-1 flex md:items-stretch  xx:my-2 lg:my-0 xx:justify-center lg:justify-end gap-5 cursor-pointer'>
				<Icon id='instagram' />
				<Icon id='x' />
				<Icon id='fb' />
			</div>
		</footer>
	);
};

export default OnboardFooter;
