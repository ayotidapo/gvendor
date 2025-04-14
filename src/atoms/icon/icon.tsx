export const Icon = ({
	svg,
	id,
	width = 24,
	height = 24,
	className = '',
	onClick,
	onFocus,
	...props
}: {
	id?: string;
	svg?: string;
	width?: number;
	height?: number;
	className?: string;
	onClick?: () => void;
	onFocus?: () => void;
}) => {
	return (
		<svg
			id={id}
			onClick={onClick}
			className={`inline-block ${className}`}
			width={width}
			height={height}
			{...props}
		>
			<use xlinkHref={`/icons_sprite.svg#${id}`}></use>
		</svg>
	);
};
