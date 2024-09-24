import { toast } from 'react-toastify';
import { apiSlice } from '../apis/api.slice';
import { Account, GetBankResponse, ResolveAccountResponse } from './getbank.type';

export const bankApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getBank: builder.query<GetBankResponse, void>({
			query: () => ({
				url:'/misc/banks',
				method: 'GET',
			}),
		}),
        getAccount: builder.query<ResolveAccountResponse, { accountNumber: string | number; bankCode: string | number}>({
			query: ({accountNumber, bankCode}) => ({
				url: `/misc/banks/resolve?accountNumber=${accountNumber}&bankCode=${bankCode}`,
				method: 'GET',
			}),
			transformResponse: (response: { data: ResolveAccountResponse }) => response.data,
			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch (err: unknown) {
					if (typeof err === 'object' && err !== null && 'error' in err) {
						const error = err as { error: { data: { error: string } } };
						toast.error(error.error.data.error);
					}
				}
			},
		}),
        updateAccount: builder.mutation<ResolveAccountResponse, { accountNumber: string | number; bankCode: string | number; data: Partial<Account>}>({
			query: ({accountNumber, bankCode, data}) => ({
				url: `/misc/banks/resolve?accountNumber=${accountNumber}&bankCode=${bankCode}`,
				method: 'PUT',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success('Account updated successfully');
				} catch (err: unknown) {
					if (typeof err === 'object' && err !== null && 'error' in err) {
						const error = err as { error: { data: { error: string } } };
						toast.error(error.error.data.error);
					}
				}
			},
		}),
	}),
});

export const { useGetBankQuery, useGetAccountQuery, useUpdateAccountMutation } =
	bankApiSlice;