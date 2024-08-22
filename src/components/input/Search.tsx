'use client';
import React, { FC, useState } from 'react';

interface SearchBarProps {
	placeholder?: string;
	onSearch: (query: string) => void;
	extraClass?: string;
}

const SearchBar: FC<SearchBarProps> = ({
	placeholder,
	onSearch,
	extraClass,
}) => {
	const [query, setQuery] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSearch = () => {
		onSearch(query);
	};

	return (
		<div className={`relative flex items-center overflow-hidden ${extraClass}`}>
            <input
				type='text'
				name='search'
				className='w-[400px] h-[58px] p-4 pt-4 border border-[#EAEAEA] shadow p-6 rounded-full text-slate-500 bg-[#F1F5F9] focus:ring-0 focus:border-0'
				value={query}
				placeholder={placeholder}
				onChange={handleInputChange}
				// extraClass='pr-10' // Padding to account for the search icon
			/>
		</div>
	);
};

export default SearchBar;
