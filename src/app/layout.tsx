import type { Metadata } from 'next';
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
				<main>
					<Container>{children}</Container>
				</main>
			</body>
		</html>
	);
}
