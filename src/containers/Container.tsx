'use client';

import { FC, ReactNode, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Providers } from '@/redux/providers/Provider';
import { Icon } from '@/components/icon/icon';
import { usePathname } from 'next/navigation';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import Navbar from '@/components/top-nav/Navbar';

interface Iprops {
	children: ReactNode;
}

const Container: FC<Iprops> = ({ children }) => {
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<Providers>
			<div className='flex grow h-screen flex-col overflow-y-auto border-r border-gray-200 bg-white'>
				<Navbar setSidebarOpen={setSidebarOpen} />
				<div>
					{!pathname.includes('auth') &&
						!pathname.includes('business-details') && (
							<SideBar
								sidebarOpen={sidebarOpen}
								setSidebarOpen={setSidebarOpen}
							/>
						)}
					{children}
					<ToastContainer autoClose={2000} position='top-center' />
				</div>
			</div>
		</Providers>
	);
};

const navigation = [
	{ name: 'Home', icon: 'home', current: true, route: '/' },
	{ name: 'Orders', icon: 'orders', current: false, route: '/orders' },
	// { name: 'Sales', icon: 'sales', current: false, route: '/sales' },
	{ name: 'Settlement', icon: 'sales', current: false, route: '/settlement' },
	{ name: 'Inventory', icon: 'inventory', current: false, route: '/inventory' },
	{ name: 'Settings', icon: 'settings', current: false, route: '/settings' },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const SideBar = ({
	sidebarOpen,
	setSidebarOpen,
}: {
	sidebarOpen: boolean;
	setSidebarOpen: (value: boolean) => void;
}) => {
	return (
		<div>
			<Dialog
				open={sidebarOpen}
				onClose={setSidebarOpen}
				className='relative z-30 lg:hidden'
			>
				<DialogBackdrop
					transition
					className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
				/>

				<div className='fixed inset-0 flex'>
					<DialogPanel
						transition
						className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
					>
						<div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4'>
							<Navigation />
						</div>
					</DialogPanel>
				</div>
			</Dialog>

			<div className='hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-72 lg:flex-col '>
				<div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4'>
					<Navigation />
				</div>
			</div>
		</div>
	);
};

const Navigation = () => {
	const pathname = usePathname();
	return (
		<nav className='flex flex-1 flex-col pt-20'>
			<ul role='list' className='flex flex-1 flex-col gap-y-10'>
				<li>
					<ul role='list' className='-mx-2 space-y-3 px-4 pt-10'>
						{navigation.map(item => (
							<li key={item.name}>
								<Link
									href={item.route}
									className={classNames(
										pathname === item.route
											? 'bg-primary bg-opacity-5 text-primary font-semibold'
											: 'text-default-gray hover:bg-primary hover:bg-opacity-5 hover:text-primary',
										'group flex gap-x-3 rounded-md p-2 text-sm leading-6'
									)}
								>
									<Icon svg={item.icon} height={24} width={24} />
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</li>
			</ul>
		</nav>
	);
};

export default Container;
