'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import New from './New';
import Processing from '../processing/Processing';
import Fulfilled from '../fulfilled/Fulfilled';
import Search from '@/components/input/Search';
import Button from '@/components/buttons/Button';

export const OrderPage: React.FC = () => {
	const [tabs, setTabs] = useState([
		{ name: 'New', isActive: true },
		{ name: 'Processing', isActive: false },
		{ name: 'Fulfilled', isActive: false },
	]);
	const [activeTab, setActiveTab] = useState('New');

	return (
		<div className='bg-white rounded-md '>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-10'>
				<div className='w-full md:w-auto md:max-w-[400px]'>
					<Search placeholder='Search orders' />
				</div>
				<div className='w-full md:w-auto'>
					<Button filter label='Order Status' name='outline' />
				</div>
			</div>
			<div className='border-b border-gray-200'>
				<nav className='-mb-px flex space-x-8' aria-label='Tabs'>
					{tabs.map(tab => (
						<button
							onClick={() => {
								setTabs(
									tabs.map(t => ({
										...t,
										isActive: t.name === tab.name,
									}))
								);
								setActiveTab(tab.name);
							}}
							key={tab.name}
							className={clsx(
								tab.isActive
									? 'border-black text-black'
									: 'border-transparent text-default-gray hover:border-gray-300 hover:text-gray-700',
								'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
							)}
							aria-current={tab.isActive ? 'page' : undefined}
						>
							{tab.name}
						</button>
					))}
				</nav>
			</div>

			{activeTab === 'New' && <New />}
			{activeTab === 'Processing' && <Processing />}
			{activeTab === 'Fulfilled' && <Fulfilled />}
		</div>
	);
};
