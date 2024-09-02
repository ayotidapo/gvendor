import { GilroyMedium, RecoletaMedium } from '@/fonts/font';

export const HeaderSub = ({
  header,
  text,
  headerClassName,
  className,
}: {
  header: string;
  text: string;
  headerClassName?: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div
        className={`
                text-[24px] md:text-[36px] lg:text-[40px] 
                lg:leading-[48px]
                font-semibold
                capitalize
                ${RecoletaMedium.className} ${headerClassName}
                `}
      >
        {header}
      </div>

      <div
        className={`
                ${GilroyMedium.className}
                text-base
                `}
      >
        {text}
      </div>
    </div>
  );
};
