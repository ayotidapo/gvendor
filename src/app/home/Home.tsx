import CountCard from '@/components/cards/CountCard';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <PageWrapper pageHeader='Home'>
			<div className='pb-10 flex justify-end'>
				<Button label='Today' name='outline'/>
			</div>
      <div className='grid grid-cols-4 gap-4'>
        <CountCard count={0} text={'TOTAL ORDER'} isCurrency={false} />
        <CountCard count={0} text={'COMPLETED ORDER'} isCurrency={false} />
        <CountCard count={0} text={'PENDING ORDER'} isCurrency={false} />
        <CountCard count={0} text={'PROCESSING ORDER'} isCurrency={false} />
        <CountCard count={0} text={'TOTAL ORDER COUNT'} isCurrency={false} />
        <CountCard count={0} text={'PENDING ORDER COUNT'} isCurrency={false} />
        <CountCard count={0} text={'PROCESSING ORDER COUNT'} isCurrency={false} />
      </div>
    </PageWrapper>
  );
};

export default HomePage;