'use client';
import { SearchIcon } from 'lucide-react';
import React, { FC, useState } from 'react';

interface SearchBarProps {
	placeholder?: string;
	extraClass?: string;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder, extraClass = '' }) => {
	const [query, setQuery] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div
			className={`relative flex rounded-full p-4 md:p-4 items-center w-full md:w-[400px] h-[58px] overflow-hidden bg-default-gray-2 ${extraClass}`}
		>
			<SearchIcon width={20} className='text-default-gray' />
			<input
				type='text'
				name='search'
				className='p-2 md:p-4 border-transparent bg-transparent focus:ring-0 focus:border-0 text-sm md:text-base'
				value={query}
				placeholder={placeholder}
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default SearchBar;
