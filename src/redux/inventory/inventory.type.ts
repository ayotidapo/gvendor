export interface Product {
	_id: string;
	name: string;
	category: string;
	inStock: number;
	price: number;
}

export interface InventoryData {
	totalUnitsSold: number;
	productsInStock: number;
	bestSellers: {
		_id: string;
		name: string;
		category: boolean;
		unitsSold: number;
		price: number;
		amountSold: number;
	}[];
	products: Product[];
}

export interface InventoryResponse {
	success: boolean;
	message: string;
	data: InventoryData;
}
