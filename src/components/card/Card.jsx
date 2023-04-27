import React from 'react';

const Card = ({ artistEvent, artistInfos, selectEvent }) => {
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day < 10 ? '0' + day : day}-${
      month < 10 ? '0' + month : month
    }-${year} / ${hours}h${String(minutes).padStart(2, '0')}`;
  };

  const handleClickShowArtist = () => {
    console.log('do Something on Click');
  };

  console.log('akekoukou', artistInfos);

  return (
    <section className='card-section'>
      {artistEvent && (
        <div
          key={artistEvent.id}
          className='container-card'
          onClick={() => selectEvent(artistEvent)}
        >
          <div className='card'>
            <div className='front-card'>
              <h2 className='artist-name'>
                {artistInfos && artistInfos[0].strArtist}
              </h2>
              <h3 className='title-event'>{artistEvent.venue.name}</h3>
              <p className='city-event'>{artistEvent.venue.city}</p>
              <p className='event-date'>{formatDate(artistEvent.datetime)}</p>
            </div>
            <div className='back-card'>
              <ul className='lineup'>
                {artistEvent.lineup.map((name, index) => {
                  if (index > 12) {
                    return null;
                  }
                  return (
                    <li key={name} onClick={() => handleClickShowArtist()}>
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Card;
