import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import Provider from '../redux/storeProvider';
import { Geist, Gilroy } from '@/fonts/font';
import { Recoleta } from '@/fonts/font';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { ToastContainer, Zoom } from 'react-toastify';
import { SimpleBtn } from '@/atoms/buttons/Button';
import { Icon } from '@/atoms/icon/icon';
import { getServerSession } from 'next-auth';
import nextAuthOptions from '@/utils/nextAuthOptions';
import Navbar from './_Navbar';
import SessionProvider from '@/providers/SessionProvider';

import LayoutWrapper from './_LayoutWrapper';

export const metadata: Metadata = {
	title: 'Good Vendor',
	description: 'Sell, Manage and Grow',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${Gilroy.variable} ${Geist.variable} ${Recoleta.variable} font-geist`}
			>
				<SessionProvider>
					<Provider>
						<ToastContainer
							autoClose={3500}
							transition={Zoom}
							position='top-center'
							className='toast-container'
							toastClassName='dark-toast'
							pauseOnFocusLoss
							limit={1}
						/>

						<LayoutWrapper>{children}</LayoutWrapper>
					</Provider>
				</SessionProvider>
			</body>
		</html>
	);
}
