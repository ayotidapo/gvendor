import { apiSlice } from '../apis/api.slice';
import {
	CategorySales,
	DashboardMetricsCount,
	// DashboardSalesValue,
	PendingOrder,
	RecentOrdersResponse,
	TopSellersResponse,
	TotalRevenue,
} from './dashboard.type';

interface Queryparams {
	status?: string;
	startDate?: string;
	endDate?: string;
	duration?: string;
}
// type OrderStatus = 'COMPLETED' | 'PENDING' | 'PROCESSING' | '';

export const dashboardApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getDashboardMetricsCount: builder.query<DashboardMetricsCount, Queryparams>(
			{
				query: ({
					status,
					//startDate,
					//endDate,
					duration }) => ({
						url: `order/metrics?status=${status}&duration=${duration}`,
						method: 'GET',
					})
			}
		),
		getTotalRevenue: builder.query<TotalRevenue, Queryparams>({
			query: ({ startDate, endDate }) => ({
				url: `order/total-revenue?endDate=${endDate}&startDate=${startDate}`,
				method: 'GET',
			}),
		}),
		getTotalProducts: builder.query<TotalRevenue, void>({
			query: () => ({
				url: `/order/total-products`,
				method: 'GET',
			}),
		}),
		getTotalTransactions: builder.query<TotalRevenue, void>({
			query: () => ({
				url: `/transactions/total-transactions`,
				method: 'GET',
			}),
		}),
		getPendingOrder: builder.query<PendingOrder, Queryparams>({
			query: ({ startDate, endDate }) => ({
				url: `/order/pending-orders-count?endDate=${endDate}&startDate=${startDate}`,
				method: 'GET',
			}),
		}),
		getSales: builder.query<CategorySales, void>({
			query: () => ({
				url: `/order/sales-by-category`,
				method: 'GET',
			}),
		}),
		getRecentOrders: builder.query<RecentOrdersResponse, void>({
			query: () => ({
				url: `/order/recent`,
				method: 'GET',
			}),
		}),
		getTopSellers: builder.query<TopSellersResponse, void>({
			query: () => ({
				url: `/order/top-sellers`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useGetDashboardMetricsCountQuery,
	useGetTotalRevenueQuery,
	useGetPendingOrderQuery,
	useGetSalesQuery,
	useGetTotalTransactionsQuery,
	useGetTotalProductsQuery,
	useGetRecentOrdersQuery,
	useGetTopSellersQuery,
} = dashboardApiSlice;
