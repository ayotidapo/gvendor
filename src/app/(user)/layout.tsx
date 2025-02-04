import Sidebar from '@/molecules/Sidebar';
import { getServerSession } from 'next-auth';
import nextAuthOptions from '@/utils/nextAuthOptions';
import { sessionUser } from '@/utils/interface';
import { getVendorApi } from '@/redux/apis/vendor';
import { redirect } from 'next/navigation';
import GetUserLayout from '@/components/GetUserLayout';
import { Suspense } from 'react';

const UserLayout: React.FC<{ children: React.ReactNode }> = async props => {
	const session = await getServerSession(nextAuthOptions);
	if (!session?.user) redirect(`/auth/login`);

	const { goodToken } = (session?.user as sessionUser) || {};
	let vendor;

	try {
		const response = await getVendorApi(goodToken);
		vendor = response?.data;
	} catch (e) {
		redirect(`/auth-validate`);
	}

	return (
		<div className='flex h-[calc(100vh-64px)]'>
			<Sidebar />
			<div className='flex-1 md:p-8 md:px-12 xx:p-2.5 h-full overflow-y-auto'>
				<Suspense>
					<GetUserLayout vendor={{ ...vendor, goodToken }}>
						{props.children}
					</GetUserLayout>
				</Suspense>
			</div>
		</div>
	);
};
export default UserLayout;
