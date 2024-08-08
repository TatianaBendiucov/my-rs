"use client";
import React, { useState } from "react";
import { SearchInputProps } from "../types/SearchTypes";
import ThemedComponent from "./ThemeComponent";

const Header = ({ searchText, onSearch }: SearchInputProps) => {
  const [searchInput, setSearchInput] = useState<string>(searchText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value.trim());
  };

  const handleSearch = () => {
    onSearch(searchInput);
  };

  return (
    <header>
      <ThemedComponent />
      <div className="search-form">
        <input type="text" value={searchInput} onChange={handleChange} />
        <button onClick={handleSearch}>Search</button>
      </div>
    </header>
  );
};

export default Header;
