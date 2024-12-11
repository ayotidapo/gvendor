import Fetch from '@/utils/fetch';

export const getDurationMetricsApi = async (duration: string) => {
	const response = await Fetch(`/order/metrics?duration=${duration}`);

	return response;
};
