const servicesOfferedOptions = [
	{ value: 'food', label: 'Food' },
	{ value: 'electronics', label: 'Electronics' },
	{
		value: 'clothes, shoes & accessories',
		label: 'Clothes, shoes & accessories',
	},
	{ value: 'hospitality', label: 'Hospitality' },
	{
		value: 'office supplies, paper and paper products',
		label: 'Office supplies, paper and paper products',
	},
	{ value: 'scents', label: 'Scents' },
	{
		value: 'personalized branding & gifting',
		label: 'Personalized Branding & Gifting',
	},
	{ value: 'catering', label: 'Catering' },
	{ value: 'travel & tours', label: 'Travel & tours' },
	{ value: 'marketing & advertising', label: 'Marketing & advertising' },
	{ value: 'furniture', label: 'Furniture' },
	{ value: 'learning and development', label: 'Learning and development' },
	{ value: 'other', label: 'Other' },
];

const businessStructureOptions = [
	{ value: 'sole proprietorship', label: 'Sole Proprietorship' },
	{ value: 'partnership', label: 'Partnership' },
	{ value: 'limited liability company', label: 'Limited Liability Company' },
	{ value: 'corporation', label: 'Corporation' },
];

export const weekDays = [
	{ label: 'Choose day', value: '' },
	{ label: 'Monday', value: 'monday' },
	{ label: 'Tuesday', value: 'tuesday' },
	{ label: 'Wednesday', value: 'wednesday' },
	{ label: 'Thursday', value: 'thursday' },
	{ label: 'Friday', value: 'friday' },
	{ label: 'Saturday', value: 'saturday' },
	{ label: 'Sunday', value: 'sunday' },
];

export const days = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
];

const orderStatus: Record<string, any> = {
	PENDING: 'new',
	PROCESSING: 'processing',
	COMPLETED: 'completed',
};
export { servicesOfferedOptions, businessStructureOptions, orderStatus };
