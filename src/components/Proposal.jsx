import React, { useState } from 'react';

const Proposal = () => {
  const [buttonClass, setButtonClass] = useState('hide');

  const handleClickProposal = (e) => {
    e.preventDefault();
    if (buttonClass === 'hide') {
      console.log('coucou');
      setButtonClass('visible');
    } else {
      console.log('pas coucou');
      setButtonClass('hide');
    }
  };
  return (
    <div className='proposal-container'>
      <button onClick={handleClickProposal} className='open-proposal'>
        Suggestion
      </button>
      <div className={`proposal-buttons ${buttonClass}`}>
        <button className='proposal-button'>Coldplay</button>
        <button className='proposal-button'>Metallica</button>
        <button className='proposal-button'>Toto</button>
        <button className='proposal-button'>Jul</button>
        <button className='proposal-button'>Iggy Pop</button>
      </div>
    </div>
  );
};

export default Proposal;
