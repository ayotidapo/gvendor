import React, { useEffect, useState } from 'react';

import cx from 'classnames';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { signOut } from 'next-auth/react';
import DropDown from '@/atoms/DropDown';
import { useDispatch, useSelector } from '@/redux/hooks';

import Image from 'next/image';
import Sidebar from '@/molecules/Sidebar';
import { getNotifications } from '@/redux/apis/notifications';
import { format } from 'date-fns';
import { Spinner } from '@/molecules/LoadingPage';

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
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [reveal, setReveal] = useState(false);
	const { firstName = '', _id } = useSelector(state => state?.vendor);
	const { loading, notifications } = useSelector(state => state?.notifications);

	const getAllNotifications = () => {
		setReveal(true);
		dispatch(getNotifications());
	};

	return (
		<div className='h-[64px] border-[0.5px] border-b-divider-gray justify-center flex items-center md:px-10 xx:px-5 fixed w-full z-10 bg-white'>
			<div>
				<Image src='/assets/logo.png' width={100} height={32} alt='logo' />
				{/* <Image src={Logo} alt='bg image' width={100} height={32} /> */}
			</div>
			{_id && (
				<>
					<div
						className={cx(`sidebar_mobile_wrapper`, { open })}
						onClick={() => setOpen(open => !open)}
					>
						<Sidebar firstName={firstName} />
					</div>

					<div className='ml-auto xx:hidden lg:block'>
						{/* this need to be moved out of here to be always displayed on both mobile and large screen  */}
						<span className='notification__span' data-count='50'>
							<span onClick={getAllNotifications}>
								<Icon id='bell' />
								<span className='badge'>50</span>
							</span>
							<section
								className={`notification__bar ${reveal ? 'reveal_' : ''}`}
							>
								<Icon
									id='close_'
									className='mb-5'
									onClick={() => setReveal(false)}
								/>
								<h3 className='text-2xl text-black font-recoleta font-semibold mb-4'>
									Notifications
								</h3>
								{loading && (
									<div className='flex justify-center'>
										<Spinner />
									</div>
								)}
								{notifications?.length < 1 && (
									<div className='flex h-[100px] justify-center items-center '>
										No notification found
									</div>
								)}
								{notifications?.map((item, i) => (
									<article className='mt-7' key={i}>
										<div className='flex justify-between mb-1.5'>
											<h2 className='text-black subpixel-antialiased'>
												{item?.title}
											</h2>
											<span className='text-sm'>
												{item?.updatedAt &&
													format(item?.updatedAt, 'dd/MM/yyyy hh:mm aa')}
											</span>
										</div>
										<p className='text-sm text-[#555555]'>{item?.message}</p>
									</article>
								))}
							</section>
						</span>
						{/* this  */}
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
