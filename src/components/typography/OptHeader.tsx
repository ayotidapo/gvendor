import { Gilroy, RecoletaMedium } from '@/fonts/font';

export const OptHeader = ({
	header,
	className,
	bigger = false,
}: {
	header: string;
	className?: string;
	bigger?: boolean;
}) => {
	return (
		<div
			className={`
				${bigger ? 'text-xl lg:text-xl' : 'text-xl'}
				font-black
				tracking-[-3%] md:tracking-normal
				${Gilroy.className} ${className}
				`}
		>
			{header}
		</div>
	);
};
