import React, { useEffect, useState } from 'react';
import { Icon } from '@/atoms/icon/icon';

const ImageUpload = ({ currentImage = '' }: { currentImage?: string }) => {
	useEffect(() => {
		if (currentImage) {
			setImage(currentImage);
		}
	}, [currentImage]);
	const [image, setImage] = useState<string | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = event => {
				setImage(event.target?.result as string);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	return (
		<div className='relative w-[200px] h-[200px]'>
			<label className='w-full h-full rounded-full border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer'>
				{image ? (
					<img
						src={image}
						alt='Uploaded'
						className='rounded-full w-full h-full object-cover'
					/>
				) : (
					<div className='w-[105px] h-[164px] py-4 flex flex-col items-center justify-center'>
						<Icon className='mb-4' svg={'camera'} height={73} width={83} />
						<span className=''>Upload image</span>
					</div>
				)}
			</label>
			<input
				type='file'
				className='absolute inset-0 opacity-0 cursor-pointer'
				onChange={handleImageChange}
			/>
		</div>
	);
};

export default ImageUpload;
