import CountCard from '@/components/cards/CountCard';
import PageWrapper from '@/containers/PageWrapper';
import Button from '@/components/buttons/Button';
import React from 'react';
import SectionCard from '@/components/cards/SectionCard';
import { Header } from '@/components/typography/Header';

const unitsSold = [
  { product: 'Stanley cups', quantity: '30' },
  { product: 'Fish pie', quantity: '30' },
  { product: 'Sunscreen', quantity: '30' },
  { product: 'Table cloth', quantity: '30' },
  { product: 'Refrigerator', quantity: '30' },
  { product: 'Cars', quantity: '30' },
]

const HomePage: React.FC = () => {
  return (
    <PageWrapper pageHeader='Home'>
      <div className='w-full flex justify-end'>
        <div className='pb-10 w-32'>
          <Button label='Today' name='outline' arrow />
        </div>
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

      <div className='grid grid-cols-3 gap-5 mt-10'>
        <div>
          {/* put graph */}
        </div>
        <div>
          {/* put graph */}
        </div>
        <div>
          <SectionCard
            header={<Header className='text-center' header={'Top products by units sold'} />}
            content={
              <div>
                {unitsSold.map(item => (
                  <div className='mt-6 flex justify-between' key={item.quantity}>
                    <div>{item.product}</div>
                    <div className='text-secondary-black'>{item.quantity}</div>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;