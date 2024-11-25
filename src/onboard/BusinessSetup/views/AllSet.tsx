import { SimpleBtn } from '@/atoms/buttons/Button';
import React from 'react';

const AllSet = () => {
	return (
		<div className='h-[calc(100vh-64px)] flex justify-center items-center'>
			<div className='w-[800px] flex flex-col justify-center items-center'>
				<h2 className='auth_h2'>You&apos;re All Set!</h2>
				<p>
					Your business sign up is complete! We’ll reach out soon with details
					on the item review process. Meanwhile, feel free to explore the
					dashboard. Once approved, your items will be available for sale on
					Good.
				</p>
				<SimpleBtn className='got_it '>Got it</SimpleBtn>
			</div>
		</div>
	);
};

export default AllSet;
