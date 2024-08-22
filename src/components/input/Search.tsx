'use client';
import { SearchIcon } from 'lucide-react';
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
    <div className='relative flex rounded-full p-4 items-center w-[400px] h-[58px] overflow-hidden bg-default-gray-2'>
      <SearchIcon width={20} className='text-default-gray' />
      <input
        type='text'
        name='search'
        className='p-4 border-transparent bg-transparent focus:ring-0 focus:border-0'
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
