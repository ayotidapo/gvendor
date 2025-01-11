import React from 'react';

export const TabNav: React.FC<{
	activeTab: string;
	setActiveTab: (tab: string) => void;
	tabs: { name: string; id: string }[];
	className?: string;
	type?: 'nav' | 'switcher';
	size?: 'regular' | 'small';
}> = ({
	activeTab,
	setActiveTab,
	tabs,
	className,
	type = 'nav',
	size = 'regular',
}) => {
	return (
		<nav
			className={`
        relative ${className}
        flex flex-nowrap overflow-x-scroll
        ${type === 'switcher' && 'border p-1 rounded-lg'}
        `}
			aria-label='Tabs'
		>
			<div
				className={`
        absolute bottom-0 left-0 right-0
        ${type === 'nav' && 'border-b border-divider-gray'}
        `}
			/>

			{tabs.map(tab => {
				const isActive = activeTab === tab.id;
				return (
					<button
						type='button'
						onClick={() => {
							setActiveTab(tab.id);
						}}
						key={tab.name}
						className={`
              ${
								isActive && type === 'nav'
									? '!border-b-[3px] !border-black !text-black font-semibold'
									: 'border-transparent text-sec-black hover:border-gray-300 hover:text-sec-black'
							}
              ${
								isActive && type === 'switcher'
									? '!bg-primary/10 !text-primary font-semibold'
									: 'border-transparent text-sec-black hover:border-gray-300 hover:text-sec-black'
							}
              ${
								type === 'nav'
									? `${size === 'regular' && 'pb-4'} ${
											size === 'small' && 'pb-3'
										} px-5`
									: `${size === 'regular' && 'py-4'} ${
											size === 'small' && 'py-3'
										} px-5 rounded-lg min-w-max w-full`
							}
              whitespace-nowrap
              ${size === 'regular' && 'text-sm'}
              ${size === 'small' && 'text-xs'}
              font-medium
              transition-all duration-300
              z-[100]
              `}
						aria-current={isActive ? 'page' : undefined}
					>
						{tab.name}
					</button>
				);
			})}
		</nav>
	);
};
