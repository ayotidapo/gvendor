import React from 'react';
import './loading.scss';

const LoadingPage: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={`loading_ ${className}`}>
			<Spinner />
		</div>
	);
};

export default LoadingPage;

export const Spinner: React.FC<{ className?: string }> = ({ className }) => {
	return <div className={`spinner ${className}`}></div>;
};
