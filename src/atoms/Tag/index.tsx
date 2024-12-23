import React from 'react';
import './tag.scss';

interface Props {
	title: string;
	className?: string;
}

const Tag: React.FC<Props> = props => {
	const { title, className } = props;
	return <span className={`tag ${className}`}>{title}</span>;
};

export default Tag;
