import { OrderDets } from '../orders/orders.type';

export interface DashboardMetricsCount {
	success: boolean;
	message: string;
	data: {
		result: {
			dateTime: string;
			date: string;
			day: string;
			total: number;
			count: number;
			hour: string;
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
	};
}

export interface TotalRevenue {
	success: boolean;
	message: string;
	data: {
		totalRevenue: number;
		percentageIncrease: number;
	};
}

export interface CategorySales {
	data: [];
	success: boolean;
	message: string;
}

export interface PendingOrder {
	success: boolean;
	message: string;
	data: {
		getPendingOrderCount: number;
		percentageIncrease: number;
	};
}

export interface Order {
	_id: string;
	itemsOrdered: string[];
	quantity: number;
	status: string;
	date: string;
	price: number;
}

export interface RecentOrdersResponse {
	success: boolean;
	message: string;
	data: OrderDets[];
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
