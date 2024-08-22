import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import Search from '@/components/input/Search';
import Button from '@/components/buttons/Button';
import CountCard from '@/components/cards/CountCard';
import ButtonCard from '@/components/cards/ButtonCard';

const Sales: React.FC = () => {
	return (
		<PageWrapper pageHeader='Sales'>
			<div className='pb-10 flex justify-between items-center'>
				<div>
					<Search onSearch='' placeholder='Search sales' />
				</div>
				<div className='flex justify-end space-x-4'>
					<Button label='Today' name='outline' />
					<Button label='Export CSV' name='outline' />
				</div>
			</div>
			<div className='grid grid-cols-1 space-y-7 max-w-lg gap-0'>
				<ButtonCard count={0} text={'WALLET BALANCE'} isCurrency={false} />
				<CountCard count={0} text={'SALES(TODAY)'} isCurrency={false} />
			</div>
		</PageWrapper>
	);
};

export default Sales;
