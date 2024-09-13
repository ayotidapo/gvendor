// import React, { useState } from 'react'
// import { format } from 'date-fns'
// import { formatCurrency } from '../../helpers'
// import { type OrderResponse } from '../../redux-toolkits/orders/orders.type'
// import { ORDERSTATUS, PRIMARY_COLOR } from '../../constants'
// import {
//   useRequestOrderDeliveryMutation,
//   useUpdateOrderMutation,
// } from '../../redux-toolkits/orders/orders.slice'
// import { Link } from 'react-router-dom'
// import { TableComponent } from '../../components/table/Table'
// import { Status } from '../../components/cards/statusTag'
// import { StatusTypes } from '../../types/types'
// import Icon from '../../components/icon'
// import { LoadingOval } from '../../components/spinner/Spinner'

// interface Props {
//   orders: OrderResponse[]
//   currentPage?: number
//   totalDataCount?: number
//   pageLimit?: number
//   onPageChange?: (page: number) => void
// }

// const tableData = [
// 	{
// 		id: '1',
// 		price: '$100',
// 		orderStatus: 'Delivered',
// 		paymentStatus: 'Paid',
// 		dateTime: '2021-09-10 12:00:00',
// 	},
// 	{
// 		id: '2',
// 		price: '$200',
// 		orderStatus: 'Pending',
// 		paymentStatus: 'Unpaid',
// 		dateTime: '2021-09-10 12:00:00',
// 	},
// 	{
// 		id: '3',
// 		price: '$300',
// 		orderStatus: 'Processing',
// 		paymentStatus: 'Paid',
// 		dateTime: '2021-09-10 12:00:00',
// 	},
// 	{
// 		id: '4',
// 		price: '$400',
// 		orderStatus: 'Delivered',
// 		paymentStatus: 'Paid',
// 		dateTime: '2021-09-10 12:00:00',
// 	},
// 	{
// 		id: '5',
// 		price: '$500',
// 		orderStatus: 'Delivered',
// 		paymentStatus: 'Paid',
// 		dateTime: '2021-09-10 12:00:00',
// 	},
// ];

// const OrderTable: React.FC = () => {

//   return (
//     <div className="">
//       <TableComponent
//         name="Orders"
//         showName
//         headers={[
//           'Order number',
//           'Customer',
//           'Date',
//           'Amount',
//           'Status',
//           <div className="w-full flex justify-end" key={`header-controls`}>
//               <LoadingOval
//                 loaderHeight="25"
//                 loaderWidth="25"
//                 color={PRIMARY_COLOR}
//               />
//           </div>,
//         ]}
//         rows={tableData.map((data) => {
//           return {
//             id: data.id,
//             content: [
//             //   <Link
//             //     to={`/orders/${data.id}`}
//             //     className="text-primary"
//             //     key={`${data.id}-product-id`}
//             //   >
//             //     #{data.id}
//             //     </Link>
//                 ,
//             //   <div
//             //     className="flex items-center space-x-3"
//             //     key={`${order.order._id}-customer`}
//             //   >
//             //     <Avatar
//             //       name={`${order.order.personalInformation.firstName} ${order.order.personalInformation.lastName}`}
//             //     />
//             //     <span>
//             //       {`${order.order.personalInformation.firstName} ${order.order.personalInformation.lastName}`}
//             //     </span>
//             //     </div>
//                 ,
//               `${format(order.order.createdAt, 'yyyy-MM-dd')}`,
//               `${formatCurrency(order.order.amount)}`,
//               <div
//                 key={`${order.order._id}-status`}
//                 className="flex items-center gap-2 overflow-visible"
//               >
//                 <Status
//                   text={order.order.status}
//                   type={
//                     (ORDERSTATUS.find(
//                       (status) =>
//                         status.name.toLowerCase() ===
//                         order.order.status.toLowerCase(),
//                     )?.type ?? 'warn') as StatusTypes
//                   }
//                 />
//               </div>,
//               <Dropdown
//                 key={`${order.order._id}-controls`}
//                 menuButton={
//                   <Icon id="ellipses" height={18} width={18} className="" />
//                 }
//                 onClickMenuItem={() => {}}
//                 menuItems={[
//                   {
//                     name: (
//                       <button
//                         className="disabled:opacity-30 w-full text-left"
//                         onClick={(): any =>
//                           handleRequestDelivery(order.order._id)
//                         }
//                         disabled={isLoading}
//                       >
//                         Request delivery
//                       </button>
//                     ),
//                     value: '',
//                   },
//                 ]}
//               />,
//             ],
//           }
//         })}
//         currentPage={currentPage}
//         totalDataCount={totalDataCount}
//         pageLimit={pageLimit}
//         onPageChange={onPageChange}
//       />
//     </div>
//   )
// }

// export default React.memo(OrderTable)
