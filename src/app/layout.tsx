import type { Metadata } from 'next';

import React, { Suspense } from 'react';
import Provider from '../redux/storeProvider';
import { Geist, Gilroy, Recoleta } from '@/fonts/font';
import { ToastContainer, Zoom } from 'react-toastify';
import SessionProvider from '@/providers/SessionProvider';
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';
import LayoutWrapper from '@/components/LayoutWrapper';
import LoadingPage from '@/molecules/LoadingPage';

export const metadata: Metadata = {
	title: 'The Good Vendor',
	description: 'Sell, Manage and Grow',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='md:text-base xx:text-[15px]'>
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
						<Suspense fallback={<LoadingPage />}>
							<LayoutWrapper>{children}</LayoutWrapper>
						</Suspense>
					</Provider>
				</SessionProvider>
			</body>
		</html>
	);
}
