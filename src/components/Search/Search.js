import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search-icon.svg';
import './Search.css';

const Search = ({ albums = [] }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? albums
        .filter((album) => album.title.toLowerCase().includes(trimmed))
        .slice(0, 6)
    : [];

  const showDropdown = focused && trimmed.length > 0;

  const handleSelect = (album) => {
    setQuery('');
    setFocused(false);
    navigate(`/album/${album.slug || album.id}`);
  };

  return (
    <div className="qtify-search-container">
      <div className="qtify-search-bar">
        <input
          type="text"
          placeholder="Search a album of your choice"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="qtify-search-input"
        />
        <button className="qtify-search-button">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
      {showDropdown && (
        <div className="qtify-search-dropdown">
          {results.length > 0 ? (
            results.map((album) => (
              <button
                key={album.id}
                type="button"
                className="qtify-search-result"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(album)}
              >
                <img className="qtify-search-result-image" src={album.image} alt="" />
                <span className="qtify-search-result-title">{album.title}</span>
              </button>
            ))
          ) : (
            <div className="qtify-search-empty">No matching albums</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;