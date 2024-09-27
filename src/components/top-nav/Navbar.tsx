import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { authSelector } from '@/redux/reducers/auth/auth.selector';
import { signOut } from '@/redux/reducers/auth/auth.reducer';
import { Icon } from '../icon/icon';
import { GoodLogo } from '../svg/svg';
import { Avatar } from '../avatar/Avatar';
import Dropdown from '../input/dropdown';
import { usePathname } from 'next/navigation';

const Navbar = ({
	sidebarOpen,
	setSidebarOpen,
}: {
	sidebarOpen?: boolean;
	setSidebarOpen?: (val: boolean) => void;
}) => {
	const dispatch = useDispatch();
	const pathname = usePathname();
	const { user } = useAppSelector(authSelector);

	const handleLogout = (): void => {
		dispatch(signOut());
	};

	const showBlandNav = pathname.includes('auth');

	return (
		<div
			className='
      px-4 md:px-10 py-6
      flex justify-between items-center
      shadow bg-white fixed
      !z-[999]
      w-full
      '
		>
			<div className='flex items-center gap-6'>
				<button onClick={() => setSidebarOpen && setSidebarOpen(!sidebarOpen)}>
					<Icon
						svg={sidebarOpen ? 'close-icon' : 'menu-icon'}
						width={sidebarOpen ? 20 : 30}
						height={sidebarOpen ? 20 : 30}
						className='transition-all duration-300 flex xl:hidden'
					/>
				</button>

				<GoodLogo fill={'#F45D2C'} />
			</div>

			{!showBlandNav && (
				<div
					className='
        flex items-center justify-between
        text-black
        gap-6
        '
				>
					<Icon svg='notification-icon' height={20} width={20} />

					<Dropdown
						menuButton={
							<Avatar name={`${user?.firstname} ${user?.lastname}`} />
						}
						onClickMenuItem={() => {}}
						menuItems={[
							{
								name: (
									<div>
										<span className='text-base font-recoleta-medium'>{`${user?.firstname} ${user?.lastname}`}</span>
										<div
											className='
                      text-sm text-sec-black
                      flex justify-between items-center
                      space-x-2
                      '
										>
											<span className='text-xs'>{user?.email}</span>
										</div>
									</div>
								),
								value: '',
							},
							{
								name: (
									<button
										onClick={handleLogout}
										className='text-danger flex items-center gap-2 w-full'
									>
										<Icon svg='logout2-icon' height={25} width={25} />
										<span>Sign out</span>
									</button>
								),
								value: '',
							},
						]}
						position='right'
					/>
				</div>
			)}
		</div>
	);
};

export default Navbar;
