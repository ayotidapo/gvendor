import { Input } from '@/atoms/Input/Input';
import React, { useEffect, useState } from 'react';
import './seachfilter.scss';
import { useSearchParams } from 'next/navigation';

interface Props {
	onTextChange: (value: string) => void;
}

const SearchFilter: React.FC<Props> = ({ onTextChange }) => {
	const sQ = useSearchParams();
	const search = sQ.get('search');
	const [searchText, setSearchText] = useState<string>(search || ' ');

	useEffect(() => {
		if (searchText === ' ') return;
		const handler = window.setTimeout(() => onTextChange(searchText), 1000);
		return () => {
			window.clearTimeout(handler);
		};
	}, [searchText]);

	return (
		<div className='search__filter'>
			<Input
				name='search'
				value={searchText?.trim() as string}
				hasIcon
				iconSvg='search'
				className='search'
				placeholder='Search'
				onChange={e => setSearchText(e.target.value)}
			/>
			{searchText?.trim() && (
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
