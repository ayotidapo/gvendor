'use client';

import React, { useEffect } from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import { Header } from '@/components/typography/Header';
import SectionCard from '@/components/cards/SectionCard';
import BarChart from '@/components/charts/BarChart';
import { TableComponent } from '@/components/table/Table';
import { CountCardContainer } from '@/containers/CountCardWrapper';
import Dropdown from '@/components/input/dropdown';
import { Icon } from '@/components/icon/icon';
import { formatCurrency } from '@/helpers';
import { useGetInventoryQuery } from '@/redux/inventory/inventory.slice';
import { useGetTopSellersQuery } from '@/redux/dashboard/dashboard.slice';

const data = [
	{ goods: 'Hand', count: '750' },
	{ goods: 'White rice', count: '500' },
	{ goods: 'Fish Sauce', count: '500' },
	{ goods: 'Johhnie', count: '250' },
	{ goods: 'Honey', count: '600' },
	{ goods: 'Rice', count: '750' },
	{ goods: 'red', count: '0' },
	{ goods: 'Juice', count: '100' },
	{ goods: 'Spag', count: '750' },
	{ goods: 'Fruit', count: '500' },
	{ goods: 'rice', count: '250' },
	{ goods: 'rice', count: '500' },
];


const Inventory: React.FC = () => {
	const { data: inventoryData } = useGetInventoryQuery();

	const labels = inventoryData?.data?.inventory.Products.map(item => item.name);
	const values1 = inventoryData?.data?.inventory.Products.map(item => item.unitsSold);

	return (
		<PageWrapper pageHeader='Inventory'>
			<div className='pb-10 flex space-x-4 justify-end'>
				<div>
					<Button label='Today' name='outline' arrow />
				</div>
				<div>
					<Button download label='Export CSV' name='outline' />
				</div>
			</div>
			<CountCardContainer
				className='
					grid grid-flow-row
					grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
					gap-10'
			>
				<CountCard
					count={inventoryData?.data?.inventory.totalUnitsSold}
					text={'TOTAL UNITS SOLD'}
					isCurrency={false}
				/>
				<CountCard
					count={inventoryData?.data.productsInStock}
					text={'PRODUCT IN STOCK'}
					isCurrency={false}
				/>
			</CountCardContainer>

			<div className='pt-6'>
				<SectionCard
					header={
						<div>
							<Header header={'Best Selling Products'} />
						</div>
					}
					content={
						<BarChart
							xGridDisplay={true}
							yGridDisplay={false}
							responsive
							labels={labels}
							data={values1}
							barThickness={24}
						/>
					}
				/>
			</div>
			<TableComponent
				headers={[
					'PRODUCT NAME',
					'CATEGORY',
					'INSTOCK',
					'UNITSOLD',
					'PRICE',
					' ',
				]}
				rows={(inventoryData?.data?.inventory?.Products || []).map(product => ({
					id: product._id,
					content: [
						product.name,
						product.category,
						product.inStock,
						product.unitsSold,
						`${formatCurrency(product.price)}`,
						<Dropdown
							key={`${product._id}-controls`}
							menuButton={
								<Icon svg='ellipses' height={18} width={18} className='' />
							}
							onClickMenuItem={() => {}}
							menuItems={[
								{
									name: (
										<button className='disabled:opacity-30 w-full text-left'>
											Request delivery
										</button>
									),
									value: '',
								},
							]}
						/>,
					],
				}))}
				name='categories-table'
				loading={false}
				isEmpty={false}
			/>
		</PageWrapper>
	);
};

export default Inventory;
