import { ObjectData } from './interface';

export const formatPhoneNumber = (number: string) => {
	if (number.startsWith('0')) {
		return '234' + number.slice(1);
	}
	return number;
};

export const constructQuery = (params: ObjectData) => {
	const filteredParams = Object.fromEntries(
		Object.entries(params).filter(([key, value]) => value !== '')
	);

	const queryString = new URLSearchParams(filteredParams).toString();
	return queryString;
};
