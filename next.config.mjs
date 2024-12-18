/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	env: {
		NEXT_PUBLIC_GOOGLE_PLACE_API: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	},
	images: {
		domains: [
			'goodliststagingstac.blob.core.windows.net',
			'gtc-goodonline-images.s3.amazonaws.com',
			'cdn.dorik.com',
		],
	},
};

export default nextConfig;
