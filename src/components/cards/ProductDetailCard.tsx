interface ProductDetailProps {
    product: string;
    count: number;
    amount: string;
    subtotal: number;
    deliveryfee: number;
    discount: number;
    servicefee: number;
    total: number;
}

const ProductDetailCard: React.FC<ProductDetailProps> = ({
    product,
    count,
    amount,
    subtotal,
    deliveryfee,
    discount,
    servicefee,
    total,
}) => {
    return (
        <div className="bg-white border border-[#EAEAEA] shadow-sm p-4 rounded-md flex items-center justify-between">
            <div className="space-y-2">
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProductDetailCard;