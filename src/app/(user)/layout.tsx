import Sidebar from '@/molecules/Sidebar';
import { getServerSession } from 'next-auth';
import nextAuthOptions from '@/utils/nextAuthOptions';
import { sessionUser } from '@/utils/interface';
import { getVendorApi } from '@/redux/apis/vendor';
import { redirect } from 'next/navigation';
import GetUserLayout from '@/components/GetUserLayout';

const UserLayout: React.FC<{ children: React.ReactNode }> = async props => {
	const session = await getServerSession(nextAuthOptions);
	const { goodToken } = (session?.user as sessionUser) || {};
	let vendor;

	try {
		const response = await getVendorApi(goodToken);
		vendor = response?.data;
	} catch {
		redirect(`/auth/login`);
	}

	return (
		<div className='flex'>
			<Sidebar />
			<div className='flex-1 p-8 px-12 h-[calc(100vh-64px)] overflow-y-auto'>
				<GetUserLayout vendor={vendor}>{props.children}</GetUserLayout>
			</div>
		</div>
	);
};
export default UserLayout;
