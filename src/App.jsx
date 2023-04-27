import { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import axios from 'axios';
import Card from './components/card/Card';
import Search from './components/Search';
import Proposal from './components/Proposal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from 'leaflet';
import vinyl from './img/vinyl.svg';
import MarkerClusterGroup from 'react-leaflet-cluster';

function App() {
  const [lat, setLat] = useState('45.71337');
  const [lng, setLng] = useState('5.12919');
  const [searchInput, setSearchInput] = useState('the weeknd');
  const [artistInfos, setArtistInfos] = useState(null);
  const [artistEvents, setArtistEvents] = useState(null);
  const [array, setArray] = useState();
  const markerRef = useRef();

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
  }, [searchInput]);

  let markers = [];
  useEffect(() => {
    let latitudeArray = [];
    let longitudeArray = [];
    for (let i = 0; i < artistEvents?.length; i++) {
      const latitude = artistEvents[i].venue.latitude;
      latitudeArray.push(latitude);
      const longitude = artistEvents[i].venue.longitude;
      longitudeArray.push(longitude);
    }
    for (let i = 0; i < latitudeArray.length; i++) {
      const marker = { geocode: [latitudeArray[i], longitudeArray[i]] };
      markers.push(marker);
    }
    setArray(markers);
  }, [artistEvents]);

  const [selectEvent, setSelectEvent] = useState(null);
  const handleSelectEvent = (event) => {
    setSelectEvent(event);
  };

  const customIcon = new Icon({
    iconUrl: vinyl,
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,

      iconSize: [33, 33],
    });
  };

  return (
    <MapContainer center={[-30, 30]} zoom={3} minZoom={3} trackResize>
      {artistEvents && artistEvents.length === 0 && (
        <div className='pas-concert'>
          <h1>{`Désolé ${searchInput} n'a pas de concerts prévus bientôt`}</h1>
        </div>
      )}

      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {array?.map((marker, index) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup className='custom-popup'>
              <Card
                artistEvent={artistEvents[index]}
                selectEvent={handleSelectEvent}
              />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <div className='search-buttons-container'>
        <Search setSearchInput={setSearchInput} />
        <Proposal setSearchInput={setSearchInput} />
      </div>
    </MapContainer>
  );
}

export default App;
