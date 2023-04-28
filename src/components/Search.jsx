import React from 'react';

const Search = ({ setSearchInput }) => {
  const handleSearchValue = () => {
    const input = document.getElementById('search-input');
    let { value } = input;
    if (value !== '') {
      setSearchInput(value);
      console.log(value);
      input.value = '';
    }
  };

  return (
    <div className='search-box'>
      <input
        type='search'
        className={`search-bar`}
        id='search-input'
        placeholder='Tape un artiste'
      />
      <button className='validate' onClick={handleSearchValue}>
        OK
      </button>
    </div>
  );
};

export default Search;
