import { ReactNode, useEffect } from 'react';
import { AuthHeader } from '@/components/typography/AuthHeader';
import { Gilroy } from '@/fonts/font';
import { useAppSelector } from '@/hooks/reduxHooks';
import { authSelector } from '@/redux/reducers/auth/auth.selector';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BGIMG from '@/assets/login-bg.svg';

const Wrapper = ({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) => {
	const router = useRouter();
	const authData = useAppSelector(authSelector);

	useEffect(() => {
		if (authData.signedIn) {
			router.push('/');
		}
	}, [authData.signedIn]);

	return (
		<div
			className={`
              ${Gilroy.variable} h-screen
              overflow-hidden lg:flex justify-center items-center
          `}
		>
			<div
				className='
                  w-[100%] lg:w-[50%]
                  p-4
                  md:flex md:justify-center lg:justify-end
                  lg:px-24 lg:pb-0
                  max-h-full pt-40 lg:pt-0
                  overflow-y-scroll hide-scroll-bar
                  '
			>
				<div className='md:max-w-[500px] w-[100%]'>
					<AuthHeader title={title} className='text-center mb-10' />
					{children}
				</div>
			</div>
			<div
				className={`
                  w-[100%] lg:w-[50%]
                  lg:flex hidden
                  min-h-[100vh]
									justify-center items-center
              `}
			>
				<div className=' w-[500px] h-[600px] relative'>
					<Image
						src={BGIMG}
						layout='fill'
						objectFit='cover'
						alt='bg image'
						className='rounded-xl'
					/>
				</div>
			</div>
		</div>
	);
};

export default Wrapper;
