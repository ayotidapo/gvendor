'use client';

import React, { useEffect } from 'react';
import './settings.scss';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { settingsTabs } from '@/utils/data';
import { getNotifSettings } from '@/redux/apis/notifications';
import { useDispatch } from '@/redux/hooks';

const BankAcct = dynamic(() => import('./views/BankAcct'));
const BizInfo = dynamic(() => import('./views/BizInfo'));
const DeleteAcct = dynamic(() => import('./views/DeleteAcct'));
const DeletePrompt = dynamic(() => import('./views/DeletePrompt'));
const ManageAcct = dynamic(() => import('./views/ManageAcct'));
const Notification = dynamic(() => import('./views/Notification'));
const PersonalInfo = dynamic(() => import('./views/PersonalInfo'));

const Settings = () => {
	const router = useRouter();
	const path = usePathname();
	const sQ = useSearchParams();
	const tab = (sQ.get('tab') as string) || 'personal-info';
	const dispatch = useDispatch();
	const onNavigate = (tabValue: string) => {
		router.push(`${path}?tab=${tabValue}`);
	};

	useEffect(() => {
		dispatch(getNotifSettings());
	});

	return (
		<div className='settings '>
			<div className='page-title_div '>
				<h2 className='title'>Settings</h2>
			</div>
			<div className='flex  w-[85%] pl-5'>
				<section className='w-[27%] mt-5'>
					<ul className='navi'>
						{settingsTabs?.map((item, i) => {
							return (
								<li
									key={i}
									className={tab === item?.value ? 'active' : ''}
									onClick={() => onNavigate(item.value)}
								>
									{item?.title}
								</li>
							);
						})}
					</ul>
				</section>

				<section className='flex-1  pl-10'>
					{tab === 'personal-info' && <PersonalInfo />}
					{tab === 'business-info' && <BizInfo />}
					{tab === 'bank-account' && <BankAcct />}
					{tab === 'notification' && <Notification />}
					{tab === 'manage-account' && <ManageAcct />}
				</section>
			</div>
		</div>
	);
};

export default Settings;
