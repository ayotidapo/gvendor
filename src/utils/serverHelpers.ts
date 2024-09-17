export const baseUrlSwitch = () => {
	let BASE_URL = process.env.NEXT_PUBLIC_VENDOR_BACKEND_BASE_URL;
	if (!BASE_URL) {
		const location = process.env.NEXT_PUBLIC_LOCATION ?? 'staging';

		if (location === 'local') {
			BASE_URL = 'https://vendor-api.staging.goodthingco.xyz/api/v1';
		} else if (location === 'staging') {
			BASE_URL = 'https://vendor-api.staging.goodthingco.xyz/api/v1';
		} else {
			BASE_URL = 'https://vendor-api.beta.goodthingco.xyz/api/v1';
		}
	}

	return BASE_URL;
};
