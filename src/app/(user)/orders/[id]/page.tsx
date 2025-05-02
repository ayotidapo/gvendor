import OrderDetailsPage from '@/components/OrderDetails';
import { ServerProps, sessionUser } from '@/utils/interface';
import { getOrdersDetailsApi } from '@/redux/apis/orderdetails';
import Fetch from '@/utils/fetch';
import { getServerSession } from 'next-auth';
import options from '@/utils/nextAuthOptions';
import { IOrderDetails } from '@/redux/reducers/order_details';
import { getSettlementsByOrderApi } from '@/redux/apis/settlements';

const OrderDetails: React.FC<ServerProps> = async ({ params }) => {
	const orderId = params?.id;

	const session = await getServerSession(options);
	const user = session?.user as sessionUser;

	const response = await Fetch(
		`/order/details/${orderId}`,
		{},
		user?.goodToken
	);
	const details = response?.data;
	console.log({ orderId });

	let res_settlements;
	try {
		const response = await Fetch(
			`/settlements/${orderId}/order`,
			{},
			user?.goodToken
		);
		res_settlements = { ...response?.data };
	} catch (e: any) {
		console.log(`Error: ${e?.message}`);
	}

	return (
		<OrderDetailsPage details={details} orderSettlement={res_settlements} />
	);
};

export default OrderDetails;
