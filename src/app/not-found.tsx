'use client';

import { SimpleBtn } from '@/atoms/buttons/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FourOhFour = () => {
	const router = useRouter();

	const handleBack = () => {
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push('/');
		}
	};
	return (
		<div className='not_found'>
			<Image src='/assets/404.png' alt='empty-state' width={250} height={250} />

			<h1 className='title mt-5 text-base'>Page Not Found</h1>
			<p className='mb-5 text-center text-[#7c7c7c] '>
				The page you are looking for is not available{' '}
			</p>
			<SimpleBtn className='notfound' onClick={handleBack}>
				Go back
			</SimpleBtn>
		</div>
	);
};
export default FourOhFour;
