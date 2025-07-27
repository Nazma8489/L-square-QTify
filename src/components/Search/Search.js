import React from 'react';
import searchIcon from '../../assets/search-icon.svg';
import './Search.css';

const Search = () => {
  return (
    <div className="qtify-search-container">
      <input
        type="text"
        placeholder="Search a album of your choice"
        className="qtify-search-input"
      />
      <button className="qtify-search-button">
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default Search;
