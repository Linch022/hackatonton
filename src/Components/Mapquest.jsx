import React, { useEffect } from 'react';

const Mapquest = ({ height, width, center, tileLayer, zoom, apiKey }) => {
  useEffect(() => {
    //API KEY
    window.L.mapquest.key = apiKey;

    //Initialiser la map

    const map = L.mapquest.map('map', {
      center,
      layers: window.L.mapquest.tileLayer(tileLayer),
      zoom,
    });

    map.addControl(window.L.mapquest.control());
  }, []);

  return (
    <div id='map' style={{ width, height }}>
      <p>Loading map</p>
    </div>
  );
};

export default Mapquest;
