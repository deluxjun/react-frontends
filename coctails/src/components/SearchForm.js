import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const setSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search">
      <div className="search-form">
        <h4>Search your favorite coctail</h4>
        <input type="text" onChange={setSearch} />
      </div>
    </div>
  );
};

export default SearchForm;
