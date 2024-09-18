import { TransactionsResponse } from "@/types/types";
import { apiSlice } from "../apis/api.slice";

export const transactionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransactions: builder.query<TransactionsResponse, void>({
            query: () => ({
                url: `/transactions`,
                method: 'GET'
            })
        })
    })
})


export const { useGetAllTransactionsQuery } = transactionsApiSlice