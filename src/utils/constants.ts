export const CURRENT_PAGE_NUMBER = 1;
export const NUMBER_OF_ITEMS_PER_PAGE = 20;

export const ORDERSTATUS = [
	{
		id: '1',
		orderStatus: 'Fulfilled',
		type: 'succes',
	},
	{
		id: '2',
		orderStatus: 'Processing',
		type: 'warn',
	},
	{
		id: '3',
		orderStatus: 'Processing',
		type: 'warn',
	},
	{
		id: '4',
		orderStatus: 'New',
		type: 'danger',
	},
	{
		id: '5',
		orderStatus: 'Delivered',
		type: 'success',
	},
];

export const PAYMENTSTATUS = [
	{
		id: '1',
		name: 'paid',
		type: 'success',
	},
	{
		id: '2',
		name: 'not Paid',
		type: 'danger',
	},
];

export const regex: Record<string, RegExp> = {
	onlyDigits: /^[^\w\d]*\d*[^\w\d]*$/,
};

export const initAvailableHours = {
	sunday: { open: '' },
	monday: { open: '' },
	tuesday: { open: '' },
	wednesday: { open: '' },
	thursday: { open: '' },
	friday: { open: '' },
	saturday: { open: '' },
};
