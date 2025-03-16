import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MagnifyingGlassIcon, Cross1Icon } from '@radix-ui/react-icons';

const SearchBar = ({ 
  placeholder = "Rechercher...", 
  onSearch, 
  className = "",
  debounceTime = 300 
}) => {
  const [query, setQuery] = useState('');
  const [debouncedTimer, setDebouncedTimer] = useState(null);

  const handleSearch = (value) => {
    // Clear previous timer
    if (debouncedTimer) {
      clearTimeout(debouncedTimer);
    }

    // Set new timer for debounced search
    const newTimer = setTimeout(() => {
      onSearch(value);
    }, debounceTime);

    setDebouncedTimer(newTimer);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <div className="relative">
        <input 
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className="
            w-full 
            pl-10 
            pr-10 
            py-2 
            border 
            border-gray-300 
            rounded-full 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500
            transition-all
            duration-300
          "
        />
        
        {/* Search Icon */}
        <MagnifyingGlassIcon 
          className="
            absolute 
            left-3 
            top-1/2 
            transform 
            -translate-y-1/2 
            text-gray-400
            w-5 
            h-5
          " 
        />

        {/* Clear Button */}
        {query && (
          <button 
            onClick={clearSearch}
            className="
              absolute 
              right-3 
              top-1/2 
              transform 
              -translate-y-1/2 
              text-gray-400 
              hover:text-gray-600
              focus:outline-none
            "
          >
            <Cross1Icon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  debounceTime: PropTypes.number
};

export default SearchBar;