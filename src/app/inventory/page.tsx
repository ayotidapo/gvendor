import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button'
import CountCard from '@/components/cards/CountCard';

const Inventory: React.FC = () => {
	return (
		<PageWrapper pageHeader='Inventory'>
			<div className='pb-10 flex justify-end space-x-4'>
				<Button label='Today' name='outline' />
				<Button label='Export CSV' name='outline' />
			</div>
			<div className='grid grid-cols-3 gap-4'>
				<CountCard count={0} text={'TOTAL UNITS SOLD'} isCurrency={false} />
				<CountCard count={0} text={'PRODUCT IN STOCK'} isCurrency={false} />
			</div>
		</PageWrapper>
	);
};

export default Inventory;
