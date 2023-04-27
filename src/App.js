import { useState } from 'react';
import Mapquest from './Components/Mapquest';
import Geoloc from './Components/Geoloc';
import './styles/index.css';

function App() {
  const [lat, setLat] = useState('45.71337');
  const [lng, setLng] = useState('5.12919');

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
