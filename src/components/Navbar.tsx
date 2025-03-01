'use client';
import React from 'react';
import Image from 'next/image';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { signOut } from 'next-auth/react';
import DropDown from '@/atoms/DropDown';
import { useSelector } from '@/redux/hooks';

const Trigger: React.FC<{ firstName: string }> = ({ firstName }) => (
	<SimpleBtn className='nav__bar_btn'>
		<span className='w-5 h-5 rounded-full bg-black text-white inline-flex items-center justify-center subpixel-antialiased font-geist mr-2 uppercase'>
			{firstName?.charAt(0)}
		</span>
		<span className='ellipsis text-left capitalize'>{firstName}</span>
		<Icon id='caret-down' width={12} height={10} className='ml-2' />
	</SimpleBtn>
);
const _Navbar: React.FC = () => {
	const { firstName = '', _id } = useSelector(state => state?.vendor);

	return (
		<div className='h-[64px] border-[0.5px] border-b-divider-gray justify-center flex items-center px-10 fixed w-full z-10 bg-white'>
			<div>
				<Image src='/assets/logo.png' width={100} height={32} alt='logo' />
			</div>
			{_id && firstName && (
				<div className='ml-auto'>
					<DropDown component={<Trigger firstName={firstName} />}>
						<div className='w-[220px] flex flex-col p-4 gap-4'>
							<span>Get help</span>
							<span
								role='button'
								onClick={() => {
									localStorage.removeItem('t_');
									signOut();
								}}
							>
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
