import { apiSlice } from '../apis/api.slice';
import {
	DashboardMetricsCount,
	DashboardSalesValue,
	RecentOrdersResponse,
	TopSellersResponse,
} from './dashboard.type';

interface Queryparams {
	startDate?: string;
	endDate?: string;
}
type OrderStatus = 'COMPLETED' | 'PENDING' | 'PROCESSING' | '';

export const dashboardApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getDashboardMetricsCount: builder.query<DashboardMetricsCount, Queryparams>(
			{
				query: ({ startDate, endDate }) => ({
					url: `/order/metrics${
						startDate !== undefined && startDate !== ''
							? `?startDate=${startDate}`
							: ''
					}${
						endDate !== undefined && endDate !== '' ? `&endDate=${endDate}` : ''
					}`,
					method: 'GET',
				}),
			}
		),
		getDashboardSalesValue: builder.query<DashboardSalesValue, OrderStatus>({
			query: (status: OrderStatus) => ({
				url: status? `/order/stats?status=${status}` : `/order/stats`,
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
	useGetRecentOrdersQuery,
	useGetTopSellersQuery,
} = dashboardApiSlice;
