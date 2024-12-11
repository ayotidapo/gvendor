import { Input } from '@/atoms/Input/Input';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface Props {
	onTextChange: (value: string) => void;
}

const SearchFilter: React.FC<Props> = ({ onTextChange }) => {
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const handler = window.setTimeout(() => onTextChange(searchText), 2000);
		return () => {
			window.clearTimeout(handler);
		};
	}, [searchText]);

	return (
		<div className='relative'>
			<Input
				name='search'
				value={searchText}
				hasIcon
				iconSvg='search'
				className='search'
				placeholder='Search'
				onChange={e => setSearchText(e.target.value)}
			/>
			{searchText && (
				<span
					className='absolute right-5 top-2.5 text-2xl inline-block cursor-pointer'
					onClick={() => setSearchText('')}
				>
					&times;
				</span>
			)}
		</div>
	);
};

export default SearchFilter;
