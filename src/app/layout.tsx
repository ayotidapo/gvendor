import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Container from '@/containers/Container';
import { Geist, Gilroy } from '@/fonts/font';
import { Recoleta } from '@/fonts/font';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata: Metadata = {
	title: 'Good Vendor',
	description: 'Sell, Manage and Grow',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${Gilroy.variable} ${Geist.variable} ${Recoleta.variable} font-geist`}
			>
				<div className='h-[64px] border-[0.5px] border-b-divider-gray justify-center flex items-center px-10 fixed w-full z-10 bg-white'>
					<div>
						<Image src='/assets/logo.png' width={100} height={32} alt='logo' />
					</div>
					<div className='flex-1 '>c</div>
				</div>
				
				<main className='pt-16'>
					<div>{children}</div>
				</main>
			</body>
		</html>
	);
}
