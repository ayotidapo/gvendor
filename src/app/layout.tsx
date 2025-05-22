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
import Script from 'next/script';

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
				<Script id='zohodeskasap' strategy='afterInteractive'>
					{`
       var d=document;s=d.createElement("script"),s.type="text/javascript",s.id="zohodeskasapscript",s.defer=!0,s.nonce="{place_your_nonce_value_here}",s.src="https://desk.zoho.com/portal/api/web/asapApp/1063902000000528027?orgId=871851886",t=d.getElementsByTagName("script")[0],t.parentNode.insertBefore(s,t),window.ZohoDeskAsapReady=function(s){var e=window.ZohoDeskAsap_asyncalls=window.ZohoDeskAsapasyncalls||[];window.ZohoDeskAsapReadyStatus?(s&&e.push(s),e.forEach(s=>s&&s()),window.ZohoDeskAsap_asyncalls=null):s&&e.push(s)};
      `}
				</Script>

				{/* <Script
					type='text/javascript'
					id='zohodeskasap'
				>{`var d=document;s=d.createElement("script"),s.type="text/javascript",s.id="zohodeskasapscript",s.defer=!0,s.nonce="{place_your_nonce_value_here}",s.src="https://desk.zoho.com/portal/api/web/asapApp/1063902000000528027?orgId=871851886",t=d.getElementsByTagName("script")[0],t.parentNode.insertBefore(s,t),window.ZohoDeskAsapReady=function(s){var e=window.ZohoDeskAsap_asyncalls=window.ZohoDeskAsapasyncalls||[];window.ZohoDeskAsapReadyStatus?(s&&e.push(s),e.forEach(s=>s&&s()),window.ZohoDeskAsap_asyncalls=null):s&&e.push(s)};`}</Script> */}
			</body>
		</html>
	);
}
