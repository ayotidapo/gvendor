'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import items from './items';
import cx from 'classnames';
import './sidebar.scss';
import { Icon } from '@/atoms/icon/icon';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Navbar: React.FC<{ firstName?: string }> = props => {
	const path = usePathname();

	return (
		<nav className='sidebar'>
			<ul className='flex flex-col h-full'>
				{items.map(item => (
					<li key={item?.name}>
						<Link
							href={item.route}
							className={cx('link', { active: item.match.test(path) })}
						>
							<Icon id={item.icon} />
							{item.name}
						</Link>
					</li>
				))}
				<li className='xx:flex lg:hidden items-center pl-5 mt-auto'>
					<span className='w-5 h-5 rounded-full bg-black text-white inline-flex items-center justify-center subpixel-antialiased font-geist mr-2 uppercase'>
						{props.firstName?.charAt(0)}
					</span>
					<span
						className='ellipsis text-left capitalize'
						style={{ width: '200px' }}
					>
						{props.firstName}
					</span>
				</li>
				<li
					className='pl-5 xx:flex lg:hidden'
					role='button'
					onClick={() => {
						localStorage.removeItem('t_');
						signOut();
					}}
				>
					<span className=' text-left capitalize'>
						<Icon id='logout2-icon' className='mr-1' />
						Sign Out
					</span>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
