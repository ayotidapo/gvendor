import Container from '@/containers/Container';

export const metadata = {
	title: 'Next.js',
	description: 'Generated by Next.js',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
