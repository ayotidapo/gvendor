import { apiSlice } from "../apis/api.slice";
import { Bank, GetBankResponse } from "./getbank.type";

export const bankApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        getBank: builder.query<GetBankResponse, void>({
            query: () => ({
                url: `/misc/banks`,
                method: 'GET',
            })
        })
    })
})

export const {
    useGetBankQuery,
}= bankApiSlice