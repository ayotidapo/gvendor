const items = [
	{ name: 'Home', icon: 'home_', route: '/', match: /^\/$/ },
	{
		name: 'Orders',
		icon: 'orders',

		route: '/orders',
		match: /^\/orders/,
	},
	// {
	// 	name: 'Transaction',
	// 	icon: 'sales',
	// 	route: '/transactions',
	// 	match: /^\/transactions/,
	// },
	{
		name: 'Inventory',
		icon: 'inventory',

		route: '/inventory',
		match: /^\/inventory/,
	},
	{
		name: 'Settlement',
		icon: 'settlement',
		route: '/settlements',
		match: /^\/settlements/,
	},
	{
		name: 'Analytics',
		icon: 'analytics',
		route: '/analytics',
		match: /^\/analytics/,
	},
	{
		name: 'Settings',
		icon: 'settings',
		route: '/settings',
		match: /^\/settings/,
	},
];
export default items;
