'use client'; // Error components must be Client Components

import { SimpleBtn } from '@/atoms/buttons/Button';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);
	console.log(`Error : ${error}`);
	return (
		<div className='h-[calc(100vh-140px)] flex flex-col justify-center items-center'>
			<h2 className='mb-2'>Something went wrong!</h2>
			<SimpleBtn
				className='notfound '
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</SimpleBtn>
		</div>
	);
}
//reset reload that page but tehre is a fn that reload the entire app
