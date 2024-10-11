import { apiSlice } from '../apis/api.slice';
import {
	DashboardMetricsCount,
	DashboardSalesValue,
	PendingOrder,
	RecentOrdersResponse,
	TopSellersResponse,
	TotalRevenue,
} from './dashboard.type';

interface Queryparams {
	startDate?: string;
	endDate?: string;
}
type OrderStatus = 'COMPLETED' | 'PENDING' | 'PROCESSING' | '';

export const dashboardApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getDashboardMetricsCount: builder.query<DashboardMetricsCount, OrderStatus>(
			{
				query: (status: OrderStatus) => ({
					url: status ? `/order/metrics?status=${status}` : `/order/metrics`,
					method: 'GET',
				}),
			}
		),
		getDashboardSalesValue: builder.query<DashboardSalesValue, OrderStatus>({
			query: (status: OrderStatus) => ({
				url: status ? `/order/stats?status=${status}` : `/order/stats`,
				method: 'GET',
			}),
		}),
		getTotalRevenue: builder.query<TotalRevenue, void>({
			query: () => ({
				url: `/order/total-revenue?timeframe=28`,
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
		getPendingOrder: builder.query<PendingOrder, void>({
			query: () => ({
				url: `/order/pending-orders-count?timeframe=28`,
				method: 'GET',
			}),
		}),
		getSales: builder.query<TotalRevenue, void>({
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
	useGetDashboardSalesValueQuery,
	useGetTotalRevenueQuery,
	useGetPendingOrderQuery,
	useGetSalesQuery,
	useGetTotalTransactionsQuery,
	useGetTotalProductsQuery,
	useGetRecentOrdersQuery,
	useGetTopSellersQuery,
} = dashboardApiSlice;
