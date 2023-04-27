import React, { useState } from 'react';
import vinylSvg from '../img/vinyl.svg';

const Search = () => {
  const [displayClass, setDisplayClass] = useState('close');

  const handleClickSearch = (e) => {
    e.preventDefault();
    if (displayClass === 'close') {
      setDisplayClass('open');
    } else {
      setDisplayClass('close');
    }
  };
  return (
    <div className='search-box'>
      <input type='text' className={`search-bar ${displayClass}`} />
      <button onClick={handleClickSearch} className='search-button'>
        <img src={vinylSvg} alt='' />
      </button>
    </div>
  );
};

export default Search;
