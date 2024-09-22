import { apiSlice } from '../apis/api.slice';
import { ProfileResponse } from './profile.type';

export const profileApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getProfile: builder.query<ProfileResponse, void>({
			query: () => ({
				url: '/vendor',
                method: 'GET',
			}),
			transformResponse: (response: { data: ProfileResponse }) => response.data,
			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log('Profile successfully fetched:', data);
				} catch (err: unknown) {
					if (typeof err === 'object' && err !== null && 'error' in err) {
						const error = err as { error: { data: { error: string } } };
						console.error('Error fetching profile:', error.error.data.error);
					}
				}
			},
		}),
	}),
});

export const {
    useGetProfileQuery,
} = profileApiSlice;