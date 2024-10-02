import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Header } from '@/components/typography/Header';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Wrapper = ({
	children,
	header,
}: {
	children: ReactNode;
	header: string;
}) => {
	const pathname = usePathname();

	return (
		<div className='w-full max-w-screen-2xl pt-36 mx-auto px-[16px] md:px-[40px] lg:px-[60px] xl:px-[80px]'>
			<Header header={header} className='text-center mb-12' />
			<nav className='flex items-center space-x-2'>
				<Link
					className={clsx({
						'text-black font-semibold': pathname.includes('/profile'),
						'text-light-gray': !pathname.includes('/profile'),
					})}
					href='/business-details/profile'
				>
					Profile
				</Link>
				<ChevronRight width={16} />
				<Link
					className={clsx({
						'text-black font-semibold': pathname.includes('/regulatory'),
						'text-light-gray': !pathname.includes('/regulatory'),
					})}
					href='/business-details/regulatory'
				>
					Regulatory
				</Link>
				<ChevronRight width={16} />
				<Link
					className={clsx({
						'text-black font-semibold': pathname.includes('/account'),
						'text-light-gray': !pathname.includes('/account'),
					})}
					href='/business-details/account'
				>
					Account
				</Link>
			</nav>
			<div>{children}</div>
		</div>
	);
};

export default Wrapper;
