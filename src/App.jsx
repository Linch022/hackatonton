import { useState, useEffect } from 'react';
import './styles/index.css';
import axios from 'axios';
import Card from './components/card/Card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from 'leaflet';
import vinyl from './img/vinyl.svg';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Query from './components/Query';
import L from 'leaflet';

function App() {
  const [userQuery, setUserQuery] = useState('');
  const [artistData, setArtistData] = useState(null);
  const [eventList, setEventList] = useState(null);
  const [markersCoords, setMarkersCoords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [hasConcert, setHasConcert] = useState(true);
  const [hasArtist, setHasArtist] = useState(true);

  function setStateToInitial() {
    setEventList(null);
    setMarkersCoords([]);
  }

  useEffect(() => {
    userQuery !== '' &&
      axios
        .get(
          `https://rest.bandsintown.com/artists/${userQuery
            .toLowerCase()
            .replace(' ', '%20')}/events?app_id=67`
        )
        .then((res) => {
          res.data.length > 0 ? setHasConcert(true) : setHasConcert(false);
          setEventList(res.data);
        })
        .catch((err) => {
          console.error(err.message);
          setHasArtist(false);
          setHasConcert(false);
        });
  }, [userQuery]);

  useEffect(() => {
    axios
      .get(
        `https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${userQuery
          .toLowerCase()
          .replace(' ', '_')}`
      )
      .then((res) => {
        console.log(res.data);
        setArtistData(res.data.artists);
        res.data.artists !== null && setHasArtist(true);
        res.data.artists === null && setHasArtist(false);
      })
      .catch((err) => console.error(err.message));
  }, [userQuery]);

  useEffect(() => {
    const markers = [];
    eventList?.map((event) => {
      const { longitude, latitude } = event.venue;
      if (latitude && longitude) {
        const geocode = [latitude, longitude];
        const { lineup } = event;
        const name = lineup[0].toLowerCase();
        const marker = { geocode, name };
        return markers.push(marker);
      }
    });
    setMarkersCoords(markers);
  }, [eventList]);

  const customMarker = new Icon({
    iconUrl: vinyl,
    iconSize: [38, 38],
    className: 'anim-vinyl',
  });

  const createClusterIcon = (cluster) => {
    return divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      iconSize: [33, 33],
    });
  };
  console.log(eventList);

  useEffect(() => {
    setErrorMessage(!hasConcert ? true : false);
    setStateToInitial();
  }, [hasConcert, hasArtist]);

  const corner1 = L.latLng(-100, -200);
  const corner2 = L.latLng(90, 200);
  const bounds = L.latLngBounds(corner1, corner2);

  return (
    <MapContainer
      center={[30, 8.623437289329258]}
      zoom={3}
      minZoom={3}
      maxBoundsViscosity={0}
      maxBounds={bounds}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Query
        query={setUserQuery}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        setHasArtist={setHasArtist}
        setHasConcert={setHasConcert}
      />

      {errorMessage && userQuery !== '' && (
        <div className='error-message-visible'>
          {hasArtist ? (
            <h2>Déso, pas de concert de {userQuery} prévu prochainement</h2>
          ) : (
            <h2>Déso, {userQuery} existe pas la fami</h2>
          )}

          <button
            type='button'
            onClick={() => {
              setErrorMessage(false);
            }}
          >
            OK
          </button>
        </div>
      )}

      {eventList ? (
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterIcon}
        >
          {markersCoords.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customMarker}>
              <Popup className='custom-popup'>
                <Card
                  event={eventList[index]}
                  artistData={artistData}
                  artist={eventList[0]?.artist}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      ) : null}
    </MapContainer>
  );
}

export default App;
