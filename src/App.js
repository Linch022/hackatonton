import { useState } from 'react';
import Mapquest from './Components/Mapquest';
import Geoloc from './Components/Geoloc';
import './styles/index.css';
import { func } from 'prop-types';
import axios from 'axios';

function App() {
  const [lat, setLat] = useState('45.71337');
  const [lng, setLng] = useState('5.12919');

  const [searchInput, setSearchInput] = useState('the Weeknd');
  const [artistInfos, setArtistInfos] = useState(null);
  const [artistEvents, setArtistEvents] = useState(null);

  const callAPIs = () => {
    axios
      .get(
        `https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${searchInput
          .toLowerCase()
          .replace(' ', '_')}`
      )
      .then((res) => {
        setArtistInfos(res.data.artists);
      })
      .catch((err) => console.error(err.message));

    axios
      .get(
        `https://rest.bandsintown.com/artists/${searchInput
          .toLowerCase()
          .replace(' ', '%20')}/events?app_id=67`
      )
      .then((res) => {
        setArtistEvents(res.data);
      })
      .catch((err) => console.error(err.message));
  };

  let markers = [];

  const setCenter = (lat, lng) => {
    setLat(lat);
    setLng(lng);

    window.L.mapquest.Map.getMap('map').setView(
      new window.L.LatLng(lat, lng),
      9
    );
  };

  const addMarker = (lat, lng, title, subTitle) => {
    const marker = window.L.mapquest
      .textMarker(new window.L.LatLng(lat, lng), {
        text: title || '',
        subtext: subTitle || '',
        position: 'right',
        type: 'marker',
        icon: {
          primaryColor: '#a8190f',
          secondaryColor: '#db2c2c',
          size: 'md',
        },
      })
      .addTo(window.L.mapquest.Map.getMap('map'));

    markers.push(marker);
  };

  return (
    <div className='container'>
      <button type='button' onClick={callAPIs}>
        callAPIS
      </button>
      <button
        type='button'
        onClick={() => {
          console.info(artistInfos);
          console.info(artistEvents);
        }}
      >
        console artists states
      </button>

      <Geoloc setCenter={setCenter} setMarker={addMarker} />
      <Mapquest
        height='100vh'
        width='100vw'
        center={[lat, lng]}
        tileLayer={'map'}
        zoom={3}
        apiKey='04fOmiVjdX1XrN84jFjaBqTNufknQw9k'
      />
    </div>
  );
}

export default App;
