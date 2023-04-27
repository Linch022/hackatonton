import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = () => {
  const [urlApi, setUrlApi] = useState(
    `https://rest.bandsintown.com/artists/Iron%20Maiden/events?app_id=12`
  );
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const getEventApi = urlApi;

    axios
      .get(getEventApi)
      .then((resp) => {
        console.log(resp.data);
        setEventData(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [urlApi]);

  return (
    <section className='card-section'>
      {eventData.map((event) => (
        <p key={event.id} className='event-descr'>
          Venue : {event.venue.name}
        </p>
      ))}
    </section>
  );
};

export default Card;
