export const formatPhoneNumber = (number: string) => {
	if (number.startsWith('0')) {
		return '234' + number.slice(1);
	}
	return number;
};