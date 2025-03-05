import { ChartOptions } from 'chart.js';
import { ObjectData } from './interface';
import { format } from 'date-fns';

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

export const definedFilter = [
	{ label: '1 day', value: 'day' },
	{ label: '1 week', value: 'week' },
	{ label: '3 months', value: 'three_months' },
	{ label: '6 months', value: 'six_months' },
	{ label: '1 year', value: 'year' },
	{ label: 'custom', value: 'custom' },
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

	NEW: 'new',
	ONGOING: 'processing',
	FULFILLED: 'completed',
	SUCCESSFUL: 'completed',
};

const orderStages = [
	{
		name: 'All',
		value: '',
	},
	{
		name: 'New',
		value: 'NEW',
	},
	{
		name: 'Processing',
		value: 'ONGOING',
	},
	{
		name: 'Completed',
		value: 'FULFILLED',
	},
];

const setStages = [
	{
		name: 'Set as new',
		value: 'NEW',
	},
	{
		name: 'Set as processing',
		value: 'ONGOING',
	},
	{
		name: 'Set as completed',
		value: 'FULFILLED',
	},
];

const inventoryStatus = [
	{
		name: 'All',
		value: '',
	},
	{
		name: 'Active',
		value: 'active',
	},
	{
		name: 'Inactive',
		value: 'inactive',
	},
];

const settlementStatus = [
	{
		name: 'All',
		value: '',
	},
	{
		name: 'Successful',
		value: 'SUCCESSFUL',
	},
	{
		name: 'Pending',
		value: 'PENDING',
	},
];

const settingsTabs = [
	{
		value: 'personal-info',
		title: 'Personal Information',
	},
	{
		value: 'business-info',
		title: 'Business Information',
	},
	{
		value: 'bank-account',
		title: 'Settlement Bank Account',
	},
	{
		value: 'notification',
		title: 'Notification Settings',
	},
	{
		value: 'manage-account',
		title: 'Manage Account',
	},
] as { value: string; title: string }[];

const notificationSettings = [];

export {
	servicesOfferedOptions,
	orderStatus,
	orderStages,
	inventoryStatus,
	settlementStatus,
	setStages,
	settingsTabs,
};
