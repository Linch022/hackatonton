import { useEffect, useState } from 'react';
import Mapquest from './components/Mapquest';
import './styles/index.css';
import Search from './components/Search';
import Proposal from './components/Proposal';
import axios from 'axios';

function App() {
  const [lat, setLat] = useState('45.71337');
  const [lng, setLng] = useState('5.12919');

  const [searchInput, setSearchInput] = useState('');
  const [artistInfos, setArtistInfos] = useState(null);
  const [artistEvents, setArtistEvents] = useState(null);

  useEffect(() => {
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
    console.log(searchInput);
  }, [searchInput]);

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
      <div className='search-buttons-container'>
        <Search setSearchInput={setSearchInput} />
        <Proposal setSearchInput={setSearchInput} />
      </div>
    </div>
  );
}

export default App;
