'use client';

import Link from 'next/link';
import React from 'react';
import items from './items';
import cx from 'classnames';
import './sidebar.scss';
import { Icon } from '@/atoms/icon/icon';
import { usePathname } from 'next/navigation';

const Navbar = () => {
	const path = usePathname();
	return (
		<nav className='sidebar'>
			<ul>
				{items.map(item => (
					<li>
						<Link
							href={item.route}
							className={cx('link', { active: item.match.test(path) })}
						>
							<Icon id={item.icon} />
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
