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
	success: boolean;
	message: string;
	data: {
		totalSaleValue: number;
		noOfOrders: number;
		noOfCustomers: number;
	}
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
		bestSellingProducts: {
			_id: string;
			products: string;
			unitsSold: number;
			amountSold: number;
		}[];
		totalUnitsSold: {
			count: number;
		};
	}[];
}
