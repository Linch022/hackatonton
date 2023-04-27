import { useState } from 'react';
import Mapquest from './Components/Mapquest';
import './styles/index.css';

function App() {
  const [lat, setLat] = useState('45.71337');
  const [lng, setLng] = useState('5.12919');

  return (
    <div className='container'>
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
