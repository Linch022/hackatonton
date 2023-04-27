import React from 'react';

const Card = ({ artistEvents, selectEvent }) => {
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

  return (
    <section className='card-section'>
      {artistEvents &&
        artistEvents.map((event) => (
          <div
            key={event.id}
            className='container-card'
            onClick={() => selectEvent(event)}
          >
            <div className='card'>
              <div className='front-card'>
                <h3 className='title-event'>{event.venue.name}</h3>
                <p className='city-event'>{event.venue.city}</p>
                <p className='event-date'>{formatDate(event.datetime)}</p>
              </div>
              <div className='back-card'>
                <ul className='lineup'>
                  {event.lineup.map((name, index) => {
                    if (index > 12) {
                      return null;
                    }
                    return <li key={name}>{name}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Card;
