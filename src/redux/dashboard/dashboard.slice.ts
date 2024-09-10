import { apiSlice } from '../apis/api.slice';
import {
	DashboardMetricsCount,
	DashboardSalesValue,
	RecentOrdersResponse,
} from './dashboard.type';

interface Queryparams {
	startDate?: string;
	endDate?: string;
}

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
				providesTags: [{ type: 'DASHBOARD', id: 'METRICS_COUNT' }],
			}
		),
		getDashboardSalesValue: builder.query<DashboardSalesValue, Queryparams>({
			query: ({ startDate, endDate }) => ({
				url: `/order/stats${
					startDate ? `?startDate=${startDate}` : ''
				}${endDate ? `&endDate=${endDate}` : ''}`,
				method: 'GET',
			}),
			providesTags: [{ type: 'DASHBOARD', id: 'SALES_VALUE' }],
		}),
		getRecentOrders: builder.query<RecentOrdersResponse, { limit: number }>({
			query: ({ limit }) => ({
				url: `/order/recent-order?limit=${limit}`,
				method: 'GET',
			}),
			providesTags: [{ type: 'DASHBOARD', id: 'RECENT_ORDERS' }],
		}),
	}),
});

export const {
	useGetDashboardMetricsCountQuery,
	useGetDashboardSalesValueQuery,
	useGetRecentOrdersQuery,
} = dashboardApiSlice;
