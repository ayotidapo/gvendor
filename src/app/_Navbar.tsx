'use client';
import React from 'react';
import Image from 'next/image';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { signOut, useSession } from 'next-auth/react';
import DropDown from '@/atoms/DropDown';

const Trigger = (
	<SimpleBtn className='nav__bar_btn'>
		<span className='w-5 h-5 rounded-full bg-black text-white inline-flex items-center justify-center subpixel-antialiased font-geist mr-2'>
			C
		</span>
		<span className='ellipsis'>Chumbsy</span>
		<Icon id='caret-down' width={12} height={10} className='ml-2' />
	</SimpleBtn>
);
const _Navbar: React.FC<{ vendorId: string }> = ({ vendorId }) => {
	return (
		<div className='h-[64px] border-[0.5px] border-b-divider-gray justify-center flex items-center px-10 fixed w-full z-10 bg-white'>
			<div>
				<Image src='/assets/logo.png' width={100} height={32} alt='logo' />
			</div>
			{vendorId && (
				<div className='ml-auto'>
					<DropDown component={Trigger}>
						<div className='w-[220px] flex flex-col p-4 gap-4'>
							<span>Get help</span>
							<span role='button' onClick={() => signOut()}>
								Sign out
							</span>
						</div>
					</DropDown>
				</div>
			)}
		</div>
	);
};

export default _Navbar;
