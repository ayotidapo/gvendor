import Image from 'next/image';

import OnboardFooter from '@/molecules/OnboardFooter';
import { getServerSession } from 'next-auth';
import options from '@/utils/nextAuthOptions';
import { redirect } from 'next/navigation';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(options);

	if (session?.user) redirect(`/`);
	return (
		<div className='h-[calc(100vh-72px)] flex flex-col overflow-y-auto'>
			<div className='flex h-full overflow-y-auto pb-[72px] '>
				<section className='flex-1   overflow-y-auto   '>
					<div className='h-full w-full flex justify-center items-center'>
						{children}
					</div>
				</section>

				<div className='flex justify-end  md:w-[40%] xs:w-0 h-[98%] relative bg-img '>
					<Image
						src='/assets/onboard-img.png'
						fill
						alt='bg image'
						className=' object-cover'
					/>
					{/* <img
                                               src='/onboardImg.png'
                                               alt='bg image'
                                               className='h-full w-full object-cover '
                                       /> */}
				</div>
			</div>
			<OnboardFooter />
		</div>
	);
}
