'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import PageWrapper from '@/containers/PageWrapper';
import NotificationPage from './notification/NotificationPage';
import ProfilePage from './profile/ProfilePage';
import SecurityPage from './security/SecurityPage';
import OpenHours from './OpenHours/OpenHours';

const Settings: React.FC = () => {
	const [tabs, setTabs] = useState([
		{ name: 'Profile', isActive: true },
		{ name: 'Security', isActive: false },
		{ name: 'Notifications', isActive: false },
		{ name: 'Work Hours', isActive: false },
	]);
	const [activeTab, setActiveTab] = useState('Profile');
	return (
		<PageWrapper pageHeader='Settings'>
			<div className='bg-white rounded-md '>
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

				{activeTab === 'Profile' && <ProfilePage />}
				{activeTab === 'Security' && <SecurityPage />}
				{activeTab === 'Notifications' && <NotificationPage />}
				{activeTab === 'Work Hours' && <OpenHours />}
			</div>
		</PageWrapper>
	);
};

export default Settings;
