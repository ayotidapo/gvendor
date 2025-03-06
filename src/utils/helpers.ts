export const formatPhoneNumber = (number: string) => {
	if (number.startsWith('0')) {
		return '234' + number.slice(1);
	}
	return number;
};

export const constructQuery = () => {
	const params = new URLSearchParams(location.search);

	const toObject = Object.fromEntries(params.entries());
	if (toObject?.duration === 'custom') delete toObject?.duration;

	const filteredParams = Object.keys(toObject).reduce((acc, cur, i) => {
		if (cur) {
			return {
				...acc,
				[cur]: toObject[cur],
			};
		}
		return acc;
	}, {});
	return new URLSearchParams(filteredParams).toString();
};
