import localFont from 'next/font/local';

const Recoleta = localFont({
	src: './Recoleta-Regular.ttf',
	display: 'swap',
	variable: '--font-recoleta',
});

const RecoletaLight = localFont({
	src: './Recoleta-Light.ttf',
	display: 'swap',
	variable: '--font-recoleta-light',
});

const RecoletaMedium = localFont({
	src: './Recoleta-Medium.ttf',
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

export {
	Gilroy,
	GilroyLight,
	GilroyMedium,
	Recoleta,
	RecoletaLight,
	RecoletaMedium,
};
