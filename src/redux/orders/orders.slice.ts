import { apiSlice } from '../apis/api.slice';
import {
	EditOrderResponse,
	EditReturnStatus,
	InitiateReturn,
	OrderDetailResponse,
	OrderResponse,
	RefundReturn,
} from './orders.type';

interface QueryParams {
	skip?: number;
	limit?: number;
	status?: string;
	startDate?: string;
	endDate?: string;
}

export const orderApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getAllOrders: builder.query<OrderResponse, QueryParams>({
			query: () => ({
				url: `/order/all`,
				method: 'GET',
			}),
		}),
		getOrderDetail: builder.mutation<OrderDetailResponse, string>({
			query: id => ({
				url: `order/details/${id}`,
				method: 'GET',
			}),
		}),
		getEditOrderResponse: builder.query<EditOrderResponse, { orderId: string }>(
			{
				query: ({ orderId }) => ({
					url: `/order/${orderId}`,
					method: 'PATCH',
				}),
			}
		),
		getInitiateReturn: builder.mutation<InitiateReturn, QueryParams>({
			query: () => ({
				url: `/order/return/initiate/`,
				method: 'POST',
			}),
		}),
		getEditReturnStatus: builder.mutation<
			EditReturnStatus,
			{ returnCode: string }
		>({
			query: ({ returnCode }) => ({
				url: `/order/return/${returnCode}`,
				method: 'PATCH',
			}),
		}),
		getRefundReturn: builder.mutation<RefundReturn, { returnCode: string }>({
			query: ({ returnCode }) => ({
				url: `/order/return/refund/${returnCode}`,
				method: 'POST',
			}),
		}),
	}),
});

export const {
	useGetAllOrdersQuery,
	useGetEditOrderResponseQuery,
	useGetInitiateReturnMutation,
	useGetEditReturnStatusMutation,
	useGetRefundReturnMutation,
	useGetOrderDetailMutation,
} = orderApiSlice;
