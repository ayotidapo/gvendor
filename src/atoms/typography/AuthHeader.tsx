import { RecoletaMedium } from '@/fonts/font';

export const AuthHeader = ({
	title,
	className = '',
}: {
	title?: string;
	className?: string;
}) => {
	return (
		<div
			className={`
			${RecoletaMedium.className}
			text-2xl md:text-[40px]
			w-full
			!font-black
			${className}
			`}
		>
			{title}
		</div>
	);
};
