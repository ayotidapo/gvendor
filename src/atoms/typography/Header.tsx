import { RecoletaMedium } from '@/fonts/font';

export const Header = ({
	header,
	className,
}: {
	header?: string;
	className?: string;
}) => {
	return (
		<div
			className={`
				font-semibold
				text-black ${header ? 'mb-10' : ''} text-[40px]
				tracking-[-3%] md:tracking-normal
				${RecoletaMedium.className} ${className}
				`}
		>
			{header}
		</div>
	);
};
