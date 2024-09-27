import { toast } from 'react-toastify';
import { apiSlice } from '../apis/api.slice';
import { ProfileData } from './profile.type';

export const profileApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: builder => ({
		getProfile: builder.query<ProfileData, void>({
			query: () => ({
				url: '/vendor',
				method: 'GET',
			}),
			transformResponse: (response: { data: ProfileData }) => response.data,
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
		updateProfile: builder.mutation<ProfileData, Partial<ProfileData>>({
			query: data => ({
				url: '/vendor',
				method: 'PUT',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success('Profile updated successfully');
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

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApiSlice;
