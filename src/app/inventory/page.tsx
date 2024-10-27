'use client'

import React from 'react';
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

const Inventory: React.FC = () => {
	const { data: inventoryData } = useGetInventoryQuery();

	const labels = inventoryData?.data?.products.map(item => item.name);
	const values1 = inventoryData?.data?.products.map(item => item.inStock);

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
				className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'
			>
				<CountCard
					count={inventoryData?.data?.totalUnitsSold ?? 0}
					text={'TOTAL UNITS SOLD'}
					isCurrency={false}
				/>
				<CountCard
					count={inventoryData?.data?.productsInStock ?? 0}
					text={'PRODUCTS IN STOCK'}
					isCurrency={false}
				/>
			</CountCardContainer>

			<div className='my-8'>
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
							labels={labels ?? []}
							data={values1 ?? []}
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
					'PRICE',
					' ',
				]}
				rows={(inventoryData?.data?.products || []).map(product => ({
					id: product._id,
					content: [
						product.name,
						product.category,
						product.inStock,
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
