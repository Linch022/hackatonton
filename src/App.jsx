import { useState, useEffect } from 'react';
import './styles/index.css';
import axios from 'axios';
import Card from './components/card/Card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from 'leaflet';
import vinylRed from './img/vinylRed.svg';
import vinylBlue from './img/vinylBlue.svg';
import vinylGreen from './img/vinylGreen.svg';
import vinylPink from './img/vinylPink.svg';
import vinylWhite from './img/vinylWhite.svg';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Query from './components/Query';
import L from 'leaflet';

function App() {
  const [userQuery, setUserQuery] = useState('');
  const [artistData, setArtistData] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [newEventList, setNewEventList] = useState([]);
  const [markersCoords, setMarkersCoords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [hasConcert, setHasConcert] = useState(true);
  const [hasArtist, setHasArtist] = useState(true);
  const [count, setCount] = useState(0);
  const [searchedArtist, setSearchedArtist] = useState([]);

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
          console.log(res.data[0].artist.name);
          res.data.length > 0 ? setHasConcert(true) : setHasConcert(false);
          if (eventList) {
            if (
              res.data[0].artist.name ===
              searchedArtist.find(
                (artist) => artist === res.data[0].artist.name
              )
            ) {
              return null;
            } else {
              setEventList((prev) => [...prev, ...res.data]);
              setNewEventList(res.data);
              setSearchedArtist((prev) => [
                ...prev,
                ...[res.data[0].artist.name],
              ]);
            }
          } else {
            setEventList(res.data);
            setNewEventList(res.data);
            setSearchedArtist([res.data[0].artist.name]);
          }
          if (count <= 4) {
            setCount(count + 1);
          } else {
            setCount(1);
          }
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
    newEventList?.map((event) => {
      const { longitude, latitude } = event.venue;
      if (latitude && longitude) {
        const geocode = [latitude, longitude];
        const { lineup } = event;
        const name = lineup[0].toLowerCase();
        const marker = { geocode, name, count };
        return markers.push(marker);
      }
    });
    setMarkersCoords((prev) => [...prev, ...markers]);
  }, [newEventList]);

  console.log(markersCoords);
  console.log(eventList);
  console.log(searchedArtist);
  const customMarker1 = new Icon({
    iconUrl: vinylRed,
    iconSize: [38, 38],
    className: 'anim-vinyl',
  });

  const customMarker2 = new Icon({
    iconUrl: vinylBlue,
    iconSize: [38, 38],
    className: 'anim-vinyl',
  });

  const customMarker3 = new Icon({
    iconUrl: vinylGreen,
    iconSize: [38, 38],
    className: 'anim-vinyl',
  });

  const customMarker4 = new Icon({
    iconUrl: vinylPink,
    iconSize: [38, 38],
    className: 'anim-vinyl',
  });

  const customMarker5 = new Icon({
    iconUrl: vinylWhite,
    iconSize: [38, 38],
    className: 'anim-vinyl',
  });

  const customIcons = [
    customMarker1,
    customMarker2,
    customMarker3,
    customMarker4,
    customMarker5,
  ];

  const selectedIcon = customIcons[count];

  const createClusterIcon = (cluster) => {
    return divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      iconSize: [33, 33],
    });
  };

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
            <h2 className='error-message-text'>
              Déso, pas de concert de {userQuery} prévu prochainement
            </h2>
          ) : (
            <h2 className='error-message-text'>
              Déso, {userQuery} n'existe pas la fami
            </h2>
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
          {markersCoords.map((marker, index) => {
            if (marker.count === 1) {
              return (
                <Marker
                  key={index}
                  position={marker.geocode}
                  icon={customMarker1}
                >
                  <Popup className='custom-popup'>
                    <Card
                      event={eventList[index]}
                      artistData={artistData}
                      artist={eventList[0]?.artist}
                    />
                  </Popup>
                </Marker>
              );
            } else if (marker.count === 2) {
              return (
                <Marker
                  key={index}
                  position={marker.geocode}
                  icon={customMarker2}
                >
                  <Popup className='custom-popup'>
                    <Card
                      event={eventList[index]}
                      artistData={artistData}
                      artist={eventList[0]?.artist}
                    />
                  </Popup>
                </Marker>
              );
            } else if (marker.count === 3) {
              return (
                <Marker
                  key={index}
                  position={marker.geocode}
                  icon={customMarker3}
                >
                  <Popup className='custom-popup'>
                    <Card
                      event={eventList[index]}
                      artistData={artistData}
                      artist={eventList[0]?.artist}
                    />
                  </Popup>
                </Marker>
              );
            } else if (marker.count === 4) {
              return (
                <Marker
                  key={index}
                  position={marker.geocode}
                  icon={customMarker4}
                >
                  <Popup className='custom-popup'>
                    <Card
                      event={eventList[index]}
                      artistData={artistData}
                      artist={eventList[0]?.artist}
                    />
                  </Popup>
                </Marker>
              );
            } else {
              return (
                <Marker
                  key={index}
                  position={marker.geocode}
                  icon={customMarker5}
                >
                  <Popup className='custom-popup'>
                    <Card
                      event={eventList[index]}
                      artistData={artistData}
                      artist={eventList[0]?.artist}
                    />
                  </Popup>
                </Marker>
              );
            }
          })}
        </MarkerClusterGroup>
      ) : null}
    </MapContainer>
  );
}

export default App;
