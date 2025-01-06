import InventoryDetailsPage from '@/components/InventoryDetails';
import { getInventoryDetailsApi } from '@/redux/apis/inventorydetails';
import Fetch from '@/utils/fetch';
import { ServerProps, sessionUser } from '@/utils/interface';
import options from '@/utils/nextAuthOptions';
import { getServerSession } from 'next-auth';

const InventoryDetails: React.FC<ServerProps> = async ({ params }) => {
	let details;
	try {
		const session = await getServerSession(options);
		const user = session?.user as sessionUser;
		const id = params?.id;
		const response = await Fetch(`/inventory/${id}`, {}, user?.goodToken);
		details = {
			...response?.data?.product,
			totalUnitsSold: response?.data?.totalUnitsSold,
		};
	} catch {
		return;
	}
	return <InventoryDetailsPage details={details} />;
};

export default InventoryDetails;
