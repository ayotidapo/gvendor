import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import { Header } from '@/components/typography/Header';
import SectionCard from '@/components/cards/SectionCard';
import BarChart from '@/components/charts/BarChart';
import { TableComponent } from '@/components/table/Table';
import { CountCardContainer } from '@/containers/CountCardWrapper';

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

const tableData = [
	{
		name: 'Jollof rice and duck',
		category: 'Food',
		instock: 6,
		unitsold: 89,
		price: 'N85,000',
	},
	{
		name: 'Jollof rice and duck',
		category: 'Food',
		instock: 6,
		unitsold: 89,
		price: 'N85,000',
	},
	{
		name: 'Jollof rice and duck',
		category: 'Food',
		instock: 6,
		unitsold: 89,
		price: 'N85,000',
	},
	{
		name: 'Jollof rice and duck',
		category: 'Food',
		instock: 6,
		unitsold: 89,
		price: 'N85,000',
	},
	{
		name: 'Jollof rice and duck',
		category: 'Food',
		instock: 6,
		unitsold: 89,
		price: 'N85,000',
	},
];

const labels = data.map(item => item.goods);
const values1 = data.map(item => item.count);

const Inventory: React.FC = () => {
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
				<CountCard count={0} text={'TOTAL UNITS SOLD'} isCurrency={false} />
				<CountCard count={0} text={'PRODUCT IN STOCK'} isCurrency={false} />
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
				headers={['PRODUCT NAME', 'CATEGORY', 'INSTOCK', 'UNITSOLD', 'PRICE']}
				rows={tableData.map(data => ({
					id: data.name,
					content: [
						data.name,
						data.category,
						data.instock,
						data.unitsold,
						data.price,
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
