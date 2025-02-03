import React, { useState } from 'react';
import { InputField } from '@/components/molecules/InputField/index.tsx';

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log('검색:', searchText);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <InputField
        id='search'
        variant='search'
        placeholder='검색어를 입력하세요'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}
