import OrderDetailsPage from '@/components/OrderDetails';
import { ServerProps, sessionUser } from '@/utils/interface';
import Fetch from '@/utils/fetch';
import { getServerSession } from 'next-auth';
import options from '@/utils/nextAuthOptions';
import { notFound } from 'next/navigation';

const OrderDetails: React.FC<ServerProps> = async ({ params }) => {
	const orderId = params?.id;
	const session = await getServerSession(options);
	const user = session?.user as sessionUser;
	let details = {
		_id: '',
		userId: '',
		personalInformation: {},
		status: '',
		totalAmount: 0,
	};

	try {
		const response = await Fetch(
			`/order/details/${orderId}`,
			{},
			user?.goodToken
		);
		details = response?.data;
	} catch (e: any) {
		notFound();
	}

	let res_settlements;
	try {
		const response = await Fetch(
			`/settlements/${orderId}/order`,
			{},
			user?.goodToken
		);
		res_settlements = { ...response?.data };
	} catch (e: any) {
		console.log(`Error: ${e?.message} ADE`);
	}

	return (
		<OrderDetailsPage details={details} orderSettlement={res_settlements} />
	);
};

export default OrderDetails;
