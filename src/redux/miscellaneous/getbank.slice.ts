import { toast } from 'react-toastify';
import { apiSlice } from '../apis/api.slice';
import { Account, AccountPayload, GetBankResponse } from './getbank.type';

export const bankApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getBank: builder.query<GetBankResponse, void>({
			query: () => ({
				url: '/misc/banks',
				method: 'GET',
			}),
		}),
		getAccount: builder.query<
			Account,
			{ accountNumber: string | number; bankCode: string | number }
		>({
			query: ({ accountNumber, bankCode }) => ({
				url: `/misc/banks/resolve?accountNumber=${accountNumber}&bankCode=${bankCode}`,
				method: 'GET',
			}),
			transformResponse: (response: { data: Account }) => response.data,
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
		updateAccount: builder.mutation<Account, Partial<AccountPayload>>({
			query: data => ({
				url: `/profile/account`,
				method: 'PATCH',
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
