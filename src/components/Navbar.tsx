import React, { useState } from 'react';
import cx from 'classnames';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { signOut } from 'next-auth/react';
import DropDown from '@/atoms/DropDown';
import { useSelector } from '@/redux/hooks';

import Image from 'next/image';
import Sidebar from '@/molecules/Sidebar';

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
	const [open, setOpen] = useState(false);
	const { firstName = '', _id } = useSelector(state => state?.vendor);

	return (
		<div className='h-[64px] border-[0.5px] border-b-divider-gray justify-center flex items-center md:px-10 xx:px-5 fixed w-full z-10 bg-white'>
			<div>
				<Image src='/assets/logo.png' width={100} height={32} alt='logo' />
				{/* <Image src={Logo} alt='bg image' width={100} height={32} /> */}
			</div>
			{_id && firstName && (
				<>
					<div
						className={cx(`sidebar_mobile_wrapper`, { open })}
						onClick={() => setOpen(open => !open)}
					>
						<Sidebar firstName={firstName} />
					</div>

					<div className='ml-auto xx:hidden lg:block'>
						<DropDown
							component={
								<span className='notification__span' data-count='50'>
									<Icon id='bell' />
								</span>
							}
							className='notification__section'
						>
							<section className='w-[420px] min-h-[400px] p-6'>
								<Icon id='close_' />
								<h3 className='text-2xl text-black font-recoleta font-semibold mb-5'>
									Notifications
								</h3>
								<article className='mt-6'>
									<div className='flex justify-between mb-1.5'>
										<h2 className='text-black subpixel-antialiased'>
											Order Update
										</h2>
										<span className='text-sm'>24m ago</span>
									</div>
									<p className='text-sm text-[#555555]'>
										Your order for “Jollof Rice and 6 Chicken Wings” has been
										placed. Tap here to track this order.
									</p>
								</article>
								<article className='mt-6'>
									<div className='flex justify-between mb-1.5'>
										<h2 className='text-black subpixel-antialiased'>
											Order Update
										</h2>
										<span className='text-sm'>07/10/2024</span>
									</div>
									<p className='text-sm text-[#555555]'>
										Your order for “Jollof Rice and 6 Chicken Wings” has been
										placed. Tap here to track this order.
									</p>
								</article>
								<article className='mt-6'>
									<div className='flex justify-between mb-1.5'>
										<h2 className='text-black subpixel-antialiased'>
											Order Update
										</h2>
										<span className='text-sm'>04/10/2024</span>
									</div>
									<p className='text-sm text-[#555555]'>
										Your order for “Jollof Rice and 6 Chicken Wings” has been
										placed. Tap here to track this order.
									</p>
								</article>
							</section>
						</DropDown>

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
					<div
						className='ml-auto z-[45] text-rose-400 xx:block lg:hidden cursor-pointer'
						onClick={() => setOpen(open => !open)}
					>
						<Icon id='menu-icon' width={35} height={35} />
					</div>
				</>
			)}
		</div>
	);
};

export default _Navbar;
