import { CustomerReport, DailyResponse, TransactionsResponse } from "@/types/types";
import { apiSlice } from "../apis/api.slice";

export const transactionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransactions: builder.query<TransactionsResponse, void>({
            query: () => ({
                url: `/transactions`,
                method: 'GET'
            })
        }),
        getDailyTransactionsChart: builder.query<DailyResponse, void>({
            query: () => ({
                url: `/report/daily-transaction-chart?filterType=year`,
                method: 'GET'
            })
        }),
        getCustomerReport: builder.query<CustomerReport, void>({
            query: () => ({
                url: `/report/customers`,
                method: 'GET'
            })
        })
    })
})


export const { useGetAllTransactionsQuery, useGetDailyTransactionsChartQuery, useGetCustomerReportQuery } = transactionsApiSlice