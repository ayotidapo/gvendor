/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	env: {
		NEXT_PUBLIC_GOOGLE_PLACE_API: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	},
};

export default nextConfig;
