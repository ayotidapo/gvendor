import { Header } from '@/components/typography/Header';
import { OptHeader } from '@/components/typography/OptHeader';
import { CheckIcon } from '@heroicons/react/24/outline';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import clsx from 'clsx';

const orderNotification = [
	'Notification only',
	'Email and notification',
	'Off',
];

const NotificationPage = () => {
	const [selectNotification, setSelectNotification] = useState('');

	return (
		<div className='pt-8 space-y-4'>
			<div>
				<Header header={'Notification Settings'} />
			</div>
			<div>
				<div>
					<OptHeader header={'Order Notifications'} />
				</div>
				<div className='pt-5'>
					Get notified when on order is placed, confirmed and fulfilled
				</div>
				{orderNotification.map((notification, idx) => (
					<div key={idx} className='relative flex items-center py-2'>
						<div
							onClick={() => setSelectNotification(notification)}
							className='flex w-full hover:cursor-pointer'
						>
							<div>
								<div
									className={clsx(
										'w-5 h-5 border-[1.5px] flex items-center justify-center rounded-full',
										{
											'bg-brand-orange border-brand-orange':
												notification === selectNotification,
											'border-default-gray':
												notification !== selectNotification,
										}
									)}
								>
									{notification === selectNotification && (
										<CheckIcon className='w-4 h-4 font-extrabold text-white bg-orange rounded-full' />
									)}
								</div>
							</div>
							<div className='ml-4 text-md space-y-6'>
								{parse(notification)}
							</div>
						</div>
					</div>
				))}
			</div>
			<hr />
			<div>
				<div>
					<OptHeader header={'Payment & Settlement Notifications'} />
				</div>
				<div>
					<div className='pt-5'>
						Get notified when a payment is received (from the customer)
					</div>
					{orderNotification.map((notification, idx) => (
						<div key={idx} className='relative flex items-center py-2'>
							<div
								onClick={() => setSelectNotification(notification)}
								className='flex w-full hover:cursor-pointer'
							>
								<div>
									<div
										className={clsx(
											'w-5 h-5 border-[1.5px] flex items-center justify-center rounded-full',
											{
												'bg-brand-orange border-brand-orange':
													notification === selectNotification,
												'border-default-gray':
													notification !== selectNotification,
											}
										)}
									>
										{notification === selectNotification && (
											<CheckIcon className='w-4 h-4 font-extrabold text-white bg-orange rounded-full' />
										)}
									</div>
								</div>
								<div className='ml-4 text-md space-y-6'>
									{parse(notification)}
								</div>
							</div>
						</div>
					))}
				</div>

				<div>
					<div className='pt-4'>Get notified when account is settled</div>
					{orderNotification.map((notification, idx) => (
						<div key={idx} className='relative flex items-center py-2'>
							<div
								onClick={() => setSelectNotification(notification)}
								className='flex w-full hover:cursor-pointer'
							>
								<div>
									<div
										className={clsx(
											'w-5 h-5 border-[1.5px] flex items-center justify-center rounded-full',
											{
												'bg-brand-orange border-brand-orange':
													notification === selectNotification,
												'border-default-gray':
													notification !== selectNotification,
											}
										)}
									>
										{notification === selectNotification && (
											<CheckIcon className='w-4 h-4 font-extrabold text-white bg-orange rounded-full' />
										)}
									</div>
								</div>
								<div className='ml-4 text-md space-y-6'>
									{parse(notification)}
								</div>
							</div>
						</div>
					))}
				</div>

				<div>
					<div className='pt-4'>Get notified when there are payment issues</div>
					{orderNotification.map((notification, idx) => (
						<div key={idx} className='relative flex items-center py-2'>
							<div
								onClick={() => setSelectNotification(notification)}
								className='flex w-full hover:cursor-pointer'
							>
								<div>
									<div
										className={clsx(
											'w-5 h-5 border-[1.5px] flex items-center justify-center rounded-full',
											{
												'bg-brand-orange border-brand-orange':
													notification === selectNotification,
												'border-default-gray':
													notification !== selectNotification,
											}
										)}
									>
										{notification === selectNotification && (
											<CheckIcon className='w-4 h-4 font-extrabold text-white bg-orange rounded-full' />
										)}
									</div>
								</div>
								<div className='ml-4 text-md space-y-6'>
									{parse(notification)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<hr />
			<div>
				<div>
					<OptHeader header={'Inventory/Stock Items'} />
				</div>
				<div>
					<div className='pt-5'>
						Get notified for low stock alerts for specific products.
					</div>
					{orderNotification.map((notification, idx) => (
						<div key={idx} className='relative flex items-center py-2'>
							<div
								onClick={() => setSelectNotification(notification)}
								className='flex w-full hover:cursor-pointer'
							>
								<div>
									<div
										className={clsx(
											'w-5 h-5 border-[1.5px] flex items-center justify-center rounded-full',
											{
												'bg-brand-orange border-brand-orange':
													notification === selectNotification,
												'border-default-gray':
													notification !== selectNotification,
											}
										)}
									>
										{notification === selectNotification && (
											<CheckIcon className='w-4 h-4 font-extrabold text-white bg-orange rounded-full' />
										)}
									</div>
								</div>
								<div className='ml-4 text-md space-y-6'>
									{parse(notification)}
								</div>
							</div>
						</div>
					))}
				</div>

				<div>
					<div className='pt-4'>Get notifications about out-of-stock items.</div>
					{orderNotification.map((notification, idx) => (
						<div key={idx} className='relative flex items-center py-2'>
							<div
								onClick={() => setSelectNotification(notification)}
								className='flex w-full hover:cursor-pointer'
							>
								<div>
									<div
										className={clsx(
											'w-5 h-5 border-[1.5px] flex items-center justify-center rounded-full',
											{
												'bg-brand-orange border-brand-orange':
													notification === selectNotification,
												'border-default-gray':
													notification !== selectNotification,
											}
										)}
									>
										{notification === selectNotification && (
											<CheckIcon className='w-4 h-4 font-extrabold text-white bg-orange rounded-full' />
										)}
									</div>
								</div>
								<div className='ml-4 text-md space-y-6'>
									{parse(notification)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NotificationPage;
