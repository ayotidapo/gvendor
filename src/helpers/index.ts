import { APIErrorResponse } from '@/types/types';

const formatCurrency = (amount: string | number): string => {
	return new Intl.NumberFormat('en-NG', {
		currency: 'NGN',
		style: 'currency',
	}).format(Number(amount));
};

const formatNumber = (count: number): string => {
	return new Intl.NumberFormat('en-IN', {
		maximumSignificantDigits: 3,
	}).format(count);
};

const getErrorMessage = (error: APIErrorResponse) => {
	return error.error?.data?.error ?? 'Something went wrong, try again later.';
};

export { formatCurrency, formatNumber, getErrorMessage };
