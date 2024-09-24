export interface DashboardMetricsCount {
	success: boolean;
	message: string;
	data: {
		result: {
			date: string;
			day: string;
			total: number;
			count: number;
		}[];
	};
}

export interface DashboardSalesValue {
	data: {
		totalOrderValue: number;
		completedOrderValue: number;
		pendingOrderValue: number;
		processingOrderValue: number;
		totalOrderCount: number;
		pendingOrderCount: number;
		processingOrderCount: number;
	};
}

export interface RecentOrdersResponse {
	success: boolean;
	message: string;
	data: {
		day: string;
		total: number;
		count: number;
	}[];
}

export interface TopSellersResponse {
	success: boolean;
	message: string;
	data: {
		_id: string;
		product: string;
		unitsSold: string;
	}[];
}
