import { Icon } from '@/atoms/icon/icon';
import React from 'react';
import './footer.scss';

const OnboardFooter = () => {
	return (
		<footer className='onboard_footer'>
			<span>&copy; 2024 The Good Thing Company. All Rights Reserved.</span>
			<span className='ml-10'>
				Why Good? | Are you an exceptional creator? | Get help
			</span>
			<div className='flex-1 flex justify-end gap-5 cursor-pointer'>
				<Icon id='instagram' />
				<Icon id='x' />
				<Icon id='fb' />
			</div>
		</footer>
	);
};

export default OnboardFooter;
