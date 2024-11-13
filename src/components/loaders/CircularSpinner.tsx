import { FC } from 'react';

interface Iprops {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}

const CircularSpinner: FC<Iprops> = ({ height, width, color, className }) => {
	return (
		<div>
			<svg
				height={height || 24}
				width={width || 24}
				stroke={color || '#000'}
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
				className={className}
			>
				<style
					dangerouslySetInnerHTML={{
						__html:
							'.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}',
					}}
				/>
				<g className='spinner_V8m1'>
					<circle cx={12} cy={12} r='9.5' fill='none' strokeWidth={3} />
				</g>
			</svg>
		</div>
	);
};

export const CommonLoader = () => (
	<div className='flex justify-center items-center h-56'>
		<CircularSpinner height={70} width={70} />
	</div>
);

export default CircularSpinner;
