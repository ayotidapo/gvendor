import React from 'react';

interface Category {
    name: string;
    percentage: number;
    color: string;
    productCount: number;
}

interface Props {
    categories: Category[];
}

const CategoryList: React.FC<Props> = ({ categories }) => {
    return (
        <ul className='space-y-3 mt-4'>
            {categories.map((category, index) => (
                <React.Fragment key={index}>
                    <li className='flex items-center'>
                        <span
                            className='w-4 h-4 mr-2 rounded-full'
                            style={{ backgroundColor: category.color }}
                        ></span>
                        <span>{`${category.name} (${category.percentage}%)`}</span>
                    </li>
                    <li>
                        <span className='text-default-gray'>{`${category.productCount.toLocaleString()} category products`}</span>
                    </li>
                </React.Fragment>
            ))}
        </ul>
    );
};

export default CategoryList;
