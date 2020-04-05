import React, { useState } from 'react';
import './SearchBar.css';

export const SearchBar = props => {
    const [searchTerm, setSearchTerm] = useState('');
    const search = () => {
        props.onSearch(searchTerm);
    }

    const handleTermChange = event => {
        setSearchTerm(event.target.value);
    }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  );
};


