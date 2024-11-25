import Sidebar from '@/molecules/Sidebar';
import Link from 'next/link';

const UserLayout: React.FC<{ children: React.ReactNode }> = async props => {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='flex-1 p-8 px-12 h-[calc(100vh-64px)] overflow-y-auto'>
				{props.children}
			</div>
		</div>
	);
};
export default UserLayout;
