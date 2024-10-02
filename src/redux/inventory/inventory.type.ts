export interface Product {
    _id: string;
    name: string;
    category: string;
    inStock: number;
    unitsSold: number;
    price: number;
    amountSold: number;
  }
  
  export interface Inventory {
    Products: Product[];
    totalUnitsSold: number;
  }
  
  export interface InventoryResponse {
    success: boolean;
    message: string;
    data: {
      inventory: Inventory;
      productsInStock: number;
    };
  }
  


