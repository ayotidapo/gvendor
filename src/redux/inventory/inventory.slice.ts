import { apiSlice } from '../apis/api.slice';
import { InventoryResponse } from './inventory.type';

export const inventoryApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getInventory: builder.query<InventoryResponse, void>({
			query: () => ({
				url: '/inventory',
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetInventoryQuery } = inventoryApiSlice;
