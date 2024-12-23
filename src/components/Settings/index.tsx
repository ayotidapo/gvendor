'use client';

import React from 'react';
import './settings.scss';

import ManageAcct from './views/DeletePrompt';

const Settings = () => {
	return (
		<div className='settings '>
			<div className='page-title_div '>
				<h2 className='title'>Settings</h2>
			</div>
			<div className='flex  w-[80%] pl-5'>
				<section className='w-[27%] mt-5'>
					<ul className='navi'>
						<li>Personal Information</li>
						<li>Business Information</li>
						<li>Settlement Bank Account</li>
						<li>Notification Settings</li>
						<li>Manage Account</li>
					</ul>
				</section>
				<section className='flex-1  pl-10'>
					<ManageAcct />
				</section>
			</div>
		</div>
	);
};

export default Settings;
