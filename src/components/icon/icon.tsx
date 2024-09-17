export const Icon = ({
	svg,
	id,
	width = 20,
	height = 20,
	className,
	onClick,
	...props
}: {
	id?: string;
	svg?: string;
	width?: number;
	height?: number;
	className?: string;
	onClick?: () => void;
}) => {
	return (
		<svg
			onClick={onClick}
			className={className}
			width={width ? width : 20}
			height={height ? height : 20}
			{...props}
		>
			<use href={`/assets/icons_sprite.svg#${svg}`}></use>
		</svg>
	);
};
