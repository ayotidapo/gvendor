import React from 'react';
import './settings.scss';
import PageWrapper from '@/containers/PageWrapper';
import EditInputBox from '@/molecules/EditInputBox';
import BankAcct from './BankAcct';

const Settings = () => {
	return (
		<PageWrapper>
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
					<section className='flex-1 text-black pl-16'>
						<BankAcct />
					</section>
				</div>
			</div>
		</PageWrapper>
	);
};

export default Settings;
