import { RecoletaMedium } from '@/fonts/font';

export const Header = ({
  header,
  className,
}: {
  header: string;
  className?: string;
}) => {
  return (
    <div
      className={`
				text-xl font-black 
				tracking-[-3%] md:tracking-normal
				${RecoletaMedium.className} ${className}
				`}
    >
      {header}
    </div>
  );
};
