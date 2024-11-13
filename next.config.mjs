/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		NEXT_PUBLIC_VENDOR_BACKEND_BASE_URL:
			process.env.NEXT_PUBLIC_VENDOR_BACKEND_BASE_URL,
		NEXT_PUBLIC_LOCATION: process.env.NEXT_PUBLIC_LOCATION,
	},
};

export default nextConfig;
