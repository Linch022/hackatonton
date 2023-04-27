import React from 'react';

const Geoloc = ({ setCenter, setMarker }) => {
  const location = () => {
    if (!navigator.geolocation) {
      alert("Merci d'activer la géolocalisation");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (setCenter) {
          setCenter(latitude, longitude);
        }
        if (setMarker) {
          setMarker(latitude, longitude, 'Vous ètes ici');
        }
      },
      (error) => {
        alert("Error d'obtention des informations");
        console.error(error);
      }
    );
  };

  return (
    <div>
      <button onClick={location}>Ma position</button>
    </div>
  );
};

export default Geoloc;
