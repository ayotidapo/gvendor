import { baseUrlSwitch } from '@/utils/serverHelpers';
// import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { updateUserWithAuth } from '../reducers/auth/auth.reducer';
import { RootState } from '../store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrlSwitch(),
  prepareHeaders: headers => {
    const cookie = Cookies.get('@good_auth')! || '{}';
    const token = JSON.parse(cookie)?.data?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const logout = async () => {
      await Cookies.remove('@good_auth');
    };
    logout();
  }

  if (result?.error?.status === 403) {
    const refreshedUserData = await baseQuery(
      '/auth/refresh',
      api,
      extraOptions
    );
    if (refreshedUserData?.data) {
      const newUserData = (api.getState() as RootState).auth.user;
      api.dispatch(updateUserWithAuth(newUserData));
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}), // eslint-disable-line
});