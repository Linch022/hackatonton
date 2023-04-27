import React, { useState } from 'react';

const Proposal = ({ setSearchInput }) => {
  const [buttonClass, setButtonClass] = useState('hide');

  const handleClickProposal = (e) => {
    e.preventDefault();
    if (buttonClass === 'hide') {
      setButtonClass('visible');
    } else {
      setButtonClass('hide');
    }
  };

  const handleproposalButton = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  return (
    <div className='proposal-container'>
      <button onClick={handleClickProposal} className='open-proposal'>
        Suggestion
      </button>
      <div className={`proposal-buttons ${buttonClass}`}>
        <button
          className='proposal-button'
          value='coldplay'
          onClick={handleproposalButton}
        >
          Coldplay
        </button>
        <button
          className='proposal-button'
          value='metallica'
          onClick={handleproposalButton}
        >
          Metallica
        </button>
        <button
          className='proposal-button'
          value='toto'
          onClick={handleproposalButton}
        >
          Toto
        </button>
        <button
          className='proposal-button'
          value='jul'
          onClick={handleproposalButton}
        >
          Jul
        </button>
        <button
          className='proposal-button'
          value='queen'
          onClick={handleproposalButton}
        >
          Queen
        </button>
      </div>
    </div>
  );
};

export default Proposal;
