import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import { Header } from '@/components/typography/Header';
import SectionCard from '@/components/cards/SectionCard';
import BarChart from '@/components/charts/BarChart'

const data = [
	{goods: 'Hand', count: '750'},
	{goods: 'White rice', count: '500'},
	{goods: 'Fish Sauce', count: '500'},
	{goods: 'Johhnie', count: '250'},
	{goods: 'Honey', count: '600'},
	{goods: 'Rice', count: '750'},
	{goods: 'red', count: '0'},
	{goods: 'Juice', count: '100'},
	{goods: 'Spag', count: '750'},
	{goods: 'Fruit', count: '500'},
	{goods: 'rice', count: '250'},
	{goods: 'rice', count: '500'}
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
			<div className='grid grid-cols-3 gap-4'>
				<CountCard count={0} text={'TOTAL UNITS SOLD'} isCurrency={false} />
				<CountCard count={0} text={'PRODUCT IN STOCK'} isCurrency={false} />
			</div>
			<div>
				<SectionCard
					header={
						<div>
							<Header header={ 'Best Selling Products'} />
						</div>
					 }
					// content={
					// 	// <BarChart responsive  labels={labels} data={values1} />
					// }
				/>
			</div>
		</PageWrapper>
	);
};

export default Inventory;
