'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Tag from '@/atoms/Tag';
import { IProduct } from '@/redux/reducers/inventories';
import { format } from 'date-fns';
import './inventory-table.scss';

const InventoryTable: React.FC<{ products: IProduct[] }> = ({ products }) => {
	const router = useRouter();

	const onNavigate = (id: string) => {
		router.push(`/inventory/${id}`);
	};
	return (
		<table className='table_ inventory'>
			<thead>
				<tr className='th_row'>
					<th>ITEM NAME</th>
					<th>PRICE</th>
					<th>QUANTITY IN STOCK</th>
					<th>STATUS</th>
					<th>ACTIONS</th>
				</tr>
			</thead>
			<tbody>
				{products.map((product, i) => (
					<tr onClick={() => onNavigate(product?._id)} key={i}>
						<td className='flex items-center'>
							<div className='relative  h-10 w-10 mr-2'>
								<Image
									src={product.images?.[0] || '/assets/no-img.jpg'}
									alt='img-product'
									fill
									className='object-cover'
								/>
								{/* <img src={product.images?.[0]} alt='' className=''/> */}
							</div>
							<span>{product.name}</span>
						</td>
						<td>{product.price}</td>
						<td>{product.inStock}</td>
						<td>
							<Tag title='Active' className='completed' />
						</td>
						<td>{format(new Date(), 'dd/MM/yyyy hh:mm aa')}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default InventoryTable;
