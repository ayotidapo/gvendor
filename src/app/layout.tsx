import type { Metadata } from 'next';

import React from 'react';
import Provider from '../redux/storeProvider';
import { Geist, Gilroy } from '@/fonts/font';
import { Recoleta } from '@/fonts/font';
import { ToastContainer, Zoom } from 'react-toastify';
import SessionProvider from '@/providers/SessionProvider';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

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
