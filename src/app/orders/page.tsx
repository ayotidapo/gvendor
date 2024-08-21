import React from 'react';
import PageWrapper from '@/containers/PageWrapper';
import { TableComponent } from '@/components/table/Table';

const tableData = [
  {
    id: '1',
    price: '$100',
    orderStatus: 'Delivered',
    paymentStatus: 'Paid',
    dateTime: '2021-09-10 12:00:00',
  },
  {
    id: '2',
    price: '$200',
    orderStatus: 'Pending',
    paymentStatus: 'Unpaid',
    dateTime: '2021-09-10 12:00:00',
  },
  {
    id: '3',
    price: '$300',
    orderStatus: 'Processing',
    paymentStatus: 'Paid',
    dateTime: '2021-09-10 12:00:00',
  },
  {
    id: '4',
    price: '$400',
    orderStatus: 'Delivered',
    paymentStatus: 'Paid',
    dateTime: '2021-09-10 12:00:00',
  },
  {
    id: '5',
    price: '$500',
    orderStatus: 'Delivered',
    paymentStatus: 'Paid',
    dateTime: '2021-09-10 12:00:00',
  },
];

const Orders: React.FC = () => {
  return (
    <PageWrapper pageHeader='Orders'>
      <TableComponent
        headers={['ORDER ID', 'PRICE', 'ORDER STATUS', 'PAYMENT STATUS', 'DATE & TIME']}
        rows={
          tableData.map((data) => ({
            id: data.id,
            content: [
              data.id,
              data.price,
              data.orderStatus,
              data.paymentStatus,
              data.dateTime,
            ],
          }))
        }
        name="categories-table"
        loading={false}
        isEmpty={false}
      />

    </PageWrapper>
  );
};

export default Orders;