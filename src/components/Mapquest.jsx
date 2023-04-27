import React, { useEffect } from 'react';
import Card from './card/Card';

const Mapquest = ({ height, width, center, tileLayer, zoom, apiKey }) => {
  useEffect(() => {
    //API KEY
    window.L.mapquest.key = apiKey;

    //Initialiser la map
    
    const map = window.L.mapquest.map('map', {
      center,
      layers: window.L.mapquest.tileLayer(tileLayer),
      zoom,
    });

    map.addControl(
      window.L.mapquest.geocodingControl({
        position: 'topright',
      })
    );

  }, []);

  return (
    <div id='map' style={{ width, height }}>
      <p>Loading map</p>
    </div>
  );
};

export default Mapquest;
