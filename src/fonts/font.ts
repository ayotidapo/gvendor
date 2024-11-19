import localFont from 'next/font/local';

const RecoletaLight = localFont({
	src: './Recoleta-Light.ttf',
	display: 'swap',
	variable: '--font-recoleta-light',
});

const RecoletaMedium = localFont({
	src: './Recoleta-Medium.ttf',
	weight: '400',
	display: 'swap',
	variable: '--font-recoleta-medium',
});

const GilroyLight = localFont({
	src: './Gilroy-Light.ttf',
	display: 'swap',
	weight: '400',
	variable: '--font-gilroy-light',
});

const Gilroy = localFont({
	src: './Gilroy-Regular.ttf',
	display: 'swap',
	weight: '400',
	variable: '--font-gilroy',
});

const GilroyMedium = localFont({
	src: './Gilroy-Medium.ttf',
	display: 'swap',
	weight: '400',
	variable: '--font-gilroy-medium',
});

const Recoleta = localFont({
	src: [
		{ path: './Recoleta-Light.ttf', weight: '100' },
		{ path: './Recoleta-Regular.ttf', weight: '400' },
		{ path: './Recoleta-Medium.ttf', weight: '500' },
		{ path: './Recoleta-Bold.ttf', weight: '700' },
	],
	display: 'swap',
	variable: '--recoleta',
});

const Geist = localFont({
	src: [
		{ path: './Geist/Geist-Light.woff2', weight: '100' },
		{ path: './Geist/Geist-Regular.woff2', weight: '400' },
		{ path: './Geist/Geist-SemiBold.woff2', weight: '500' },
		{ path: './Geist/Geist-Bold.woff2', weight: '700' },
		{ path: './Geist/Geist-Black.woff2', weight: '900' },
	],
	display: 'swap',
	variable: '--geist',
});

export {
	Gilroy,
	GilroyLight,
	GilroyMedium,
	Recoleta,
	RecoletaLight,
	RecoletaMedium,
	Geist,
};
