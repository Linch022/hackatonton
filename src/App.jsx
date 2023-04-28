import { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import axios from 'axios';
import Card from './components/card/Card';
import Search from './components/Search';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from 'leaflet';
import vinyl from './img/vinyl.svg';
import MarkerClusterGroup from 'react-leaflet-cluster';

function App() {
  const [searchInput, setSearchInput] = useState('');
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

  console.log(artistEvents, 'event');
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
  console.log(array);

  console.log(artistEvents);

  const [selectEvent, setSelectEvent] = useState(null);
  const handleSelectEvent = (event) => {
    setSelectEvent(event);
  };

  const customIcon = new Icon({
    iconUrl: vinyl,
    iconSize: [38, 38],
    className: 'anim-vinyl',
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      // className: 'custom-marker-cluster',
      iconSize: [33, 33],
    });
  };

  return (
    <MapContainer center={[17.913250433640037, 8.623437289329258]} zoom={4}>
      <div className='container'>
        <Card
          artistEvents={artistEvents}
          artistInfos={artistInfos}
          selectEvent={handleSelectEvent}
        />
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
                  artistInfos={artistInfos}
                  selectEvent={handleSelectEvent}
                  artist={artistEvents[0].artist}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <div className='search-buttons-container'>
          <Search setSearchInput={setSearchInput} />
        </div>
      </div>
    </MapContainer>
  );
}

export default App;
