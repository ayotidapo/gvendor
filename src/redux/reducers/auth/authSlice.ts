import {
  APIErrorResponse,
  AuthResponse,
  ForgotPassword,
  Login,
  ResetPassword,
  ResetPasswordResponse,
  User,
} from '@/types/types';
import { toast } from 'react-toastify';
import { apiSlice } from '../../apis/api.slice';
import { updateUserWithAuth } from './auth.reducer';

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, Partial<Login>>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: { data: AuthResponse }) => response.data,
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err: unknown) {
          if (typeof err === 'object' && err !== null && 'error' in err) {
            const error = err as { error: { data: { error: string } } };
            toast.error(String(error.error.data.error), { theme: 'colored' });
          }
        }
      },
    }),
    signup: builder.mutation<AuthResponse, Partial<User>>({
      query: credentials => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: { data: AuthResponse }) => response.data,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;

          if (res?.data?.data?.user) {
            dispatch(updateUserWithAuth(res));
            toast.success('Sign up successful', { theme: 'colored' });
            window.location.href = '/';
          }
        } catch (err: unknown) {
          if (typeof err === 'object' && err !== null && 'error' in err) {
            const error = err as { error: { data: { error: string } } };
            toast.error(String(error.error.data.error), { theme: 'colored' });
          }
        }
      },
    }),
    forgotPassword: builder.mutation<AuthResponse, Partial<ForgotPassword>>({
      query: email => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: email,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      Partial<ResetPassword>
    >({
      query: email => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: email,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.message);
        } catch (err) {
          const error = err as APIErrorResponse;
          toast.error(String(error.error.data.error), { theme: 'colored' });
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
