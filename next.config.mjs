/** @type {import('next').NextConfig} */
const nextConfig = {
	// experimental: {
	// 	missingSuspenseWithCSRBailout: false,
	// },
	productionBrowserSourceMaps: true,
	env: {
		NEXT_PUBLIC_GOOGLE_PLACE_API: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'goodliststagingstac.blob.core.windows.net',
			},
			{ protocol: 'https', hostname: 'gtc-goodonline-images.s3.amazonaws.com' },
			{ protocol: 'https', hostname: 'cdn.dorik.com' },
			{ protocol: 'https', hostname: 'someee.com' },
		],
	},
};

export default nextConfig;
