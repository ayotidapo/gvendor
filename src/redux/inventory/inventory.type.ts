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
	bestSellers: Product[]; 
	products: Product[];
  }
  
  export interface InventoryResponse {
	success: boolean;
	message: string;
	data: InventoryData;
  }
  