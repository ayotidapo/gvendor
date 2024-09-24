export interface Bank {
    id: number;
    name: string;
    slug: string; 
    code: string;
    longcode: string | null;
    gateway: string | null;
    pay_with_bank: boolean;
    supports_transfer: boolean;
    active: boolean;
    country: string;
    currency: string;
    type: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetBankResponse{
    success: boolean;
    message: string;
    data: Bank[];
}