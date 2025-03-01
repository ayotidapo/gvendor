import Image from 'next/image';

import OnboardFooter from '@/molecules/OnboardFooter';
import { getServerSession } from 'next-auth';
import options from '@/utils/nextAuthOptions';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Next.js',
	description: 'Generated by Next.js',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(options);
	if (session) redirect(`/`);
	return (
		<div className='h-[calc(100vh-72px)] flex flex-col overflow-y-auto'>
			<div className='flex h-full overflow-y-auto pb-[72px] '>
				<section className='flex-1 flex  overflow-y-auto  justify-center items-center '>
					<div className='max-h-[100%]'>{children}</div>
				</section>

				<div className='flex justify-end  w-[40%] h-[98%] relative'>
					<Image
						src='/assets/onboard-img.png'
						layout='fill'
						alt='bg image'
						objectFit='cover'
					/>
				</div>
			</div>
			<OnboardFooter />
		</div>
	);
}
