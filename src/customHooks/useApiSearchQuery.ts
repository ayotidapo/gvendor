import { useSearchParams } from 'next/navigation';

const useApiSearchQuery = (limit = 10) => {
	const sQ = useSearchParams();
	const page = sQ.get('page') || 1;
	const status = sQ.get('status') || '';
	const search = sQ.get('search') || '';
	const searchParamsObject = Object.fromEntries(sQ.entries());

	const constructApiQuery = () => {
		const filteredParams = Object.fromEntries(
			Object.entries(searchParamsObject).filter(
				([key, value]) => value !== '' && key !== 'page'
			)
		);

		let qString = new URLSearchParams(filteredParams).toString();

		const skip = (Number(page) - 1) * limit;

		qString = page ? `?skip=${skip}&limit=${limit}&${qString}` : `?${qString}`;

		return qString;
	};

	return { constructApiQuery, page, status, search };
};

export default useApiSearchQuery;