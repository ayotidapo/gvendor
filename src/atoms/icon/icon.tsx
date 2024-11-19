export const Icon = ({
	svg,
	id,
	width = 24,
	height = 24,
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
			id={id}
			onClick={onClick}
			className={className}
			width={width}
			height={height}
			{...props}
		>
			<use href={`/assets/icons_sprite.svg#${id}`}></use>
		</svg>
	);
};
