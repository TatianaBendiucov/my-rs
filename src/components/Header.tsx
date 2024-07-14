import React, { useState } from "react";
import { SearchInputProps } from "../types/SearchTypes";

const Header = ({ searchText, onSearch }: SearchInputProps) => {
  const [searchInput, setSearchInput] = useState<string>(searchText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.trim());
  };

  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <div className="search-form">
      <input type="text" value={searchInput} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Header;
