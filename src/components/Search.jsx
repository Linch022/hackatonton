import React, { useState } from 'react';
import vinylSvg from '../img/vinyl.svg';

const Search = ({ setSearchInput }) => {
  const [displayClass, setDisplayClass] = useState('close');

  const handleClickSearch = (e) => {
    e.preventDefault();
    if (displayClass === 'close') {
      setDisplayClass('open');
    } else {
      setDisplayClass('close');
    }
  };

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
        type='text'
        className={`search-bar ${displayClass}`}
        id='search-input'
      />
      <button
        onClick={handleClickSearch}
        className={`${displayClass}-button vinyl-button`}
      >
        <img src={vinylSvg} alt='' />
      </button>
      <button className='validate' onClick={handleSearchValue}>
        OK
      </button>
    </div>
  );
};

export default Search;
