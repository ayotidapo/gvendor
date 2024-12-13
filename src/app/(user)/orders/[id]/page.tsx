import OrderDetailsPage from '@/components/OrderDetails';
import { ServerProps, sessionUser } from '@/utils/interface';
import { getOrdersDetailsApi } from '@/redux/apis/orderdetails';
import Fetch from '@/utils/fetch';
import { getServerSession } from 'next-auth';
import options from '@/utils/nextAuthOptions';
import { IOrderDetails } from '@/redux/reducers/order_details';

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

	return <OrderDetailsPage details={details} />;
};

export default OrderDetails;
