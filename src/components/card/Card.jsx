import { useState } from 'react';
import Video from './Video';
import youtbe from '../../img/youtube.svg';
import spotify from '../../img/spotify.svg';
import facebook from '../../img/facebook.svg';

const Card = ({ artistEvent, artistInfos, selectEvent, artist }) => {
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day < 10 ? '0' + day : day}-${
      month < 10 ? '0' + month : month
    }-${year} / ${hours}h${String(minutes).padStart(2, '0')}`;
  };

  const [showArtistInfo, setShowArtistInfo] = useState(false);

  const handleClickShowArtist = () => {
    setShowArtistInfo(!showArtistInfo);
    console.log('do Something on Click');
  };

  // const id = artistInfos[0].idArtist;
  console.log('akekoukou', artistInfos);
  console.log(artist?.links.includes('youtube'));
  return (
    <section className='card-section'>
      {artistEvent && (
        <div
          key={artistEvent.id}
          className='container-card'
          onClick={() => selectEvent(artistEvent)}
        >
          <div className='card'>
            <ul className='front-card'>
              <li className='event-date'>{formatDate(artistEvent.datetime)}</li>
              <li className='artist-name'>
                {artistInfos && artistInfos[0].strArtist}
              </li>
              <li className='artist-music-genre'>
                {artistInfos && artistInfos[0].strGenre}
              </li>
              <li className='title-event'>{artistEvent.venue.name}</li>
              <li className='city-event'>{artistEvent.venue.city}</li>
              <li className='url-ticket'>
                <a href={artistEvent.url}>Acheter mon ticket</a>
              </li>
              {artistEvent.lineup.map((name, index) => {
                if (index === 3) {
                  return <li>Et d'autres...</li>;
                } else if (index >= 4) {
                  return null;
                }
                return (
                  <li key={name} onClick={() => handleClickShowArtist()}>
                    {name}
                  </li>
                );
              })}
              {showArtistInfo && (
                <div className='artist-info'>
                  {artistInfos && artistInfos[0].strBiographyFR}
                </div>
              )}
              {artistInfos && <Video id={artistInfos[0].idArtist} />}
              <ul>
                <li className='social-media'>
                  {/* <a href={artistEvent.artist.links.includes('spotify').url}>
                    <img src={spotify} alt='' />
                  </a> */}
                </li>
                <li className='social-media'></li>
                <li className='social-media'></li>
              </ul>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Card;
