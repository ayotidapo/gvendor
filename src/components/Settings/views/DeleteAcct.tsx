import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import React from 'react';

const DeleteAcct = () => {
	return (
		<div>
			<div className='flex justify-between items-center'>
				<span className='mb-1 text-black subpixel-antialiased '>
					Delete account
				</span>

				<SimpleBtn className='toggle_edit'>
					<span className='cursor-pointer ml-1 flex text-[#B3434D]'>
						Delete account
					</span>
					<Icon id='close' width={20} height={20} className='ml-1' />
				</SimpleBtn>
			</div>
			<p className='text-[#555555]'>
				Permanently delete your Good creator account
			</p>
		</div>
	);
};

export default DeleteAcct;
