import React from 'react';

const Query = ({ query, setErrorMessage, setHasConcert, setHasArtist }) => {
  const handleSearchValue = () => {
    setErrorMessage(false);
    setHasConcert(true);
    setHasArtist(true);
    const input = document.getElementById('search-input');
    let { value } = input;
    if (value !== '') {
      query(value);
      console.log(value);
      input.value = '';
    }
  };

  return (
    <div className='search-box'>
      <input
        type='text'
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

export default Query;
