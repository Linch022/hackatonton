import { useEffect, useState } from 'react';
import Video from './Video';
import youtbe from '../../img/youtube.svg';
import spotify from '../../img/spotify.svg';
import facebook from '../../img/facebook.svg';
import soundcloud from '../../img/soundcloud.svg';
import axios from 'axios';

const Card = ({ artistEvent, artistInfos, selectEvent, artist }) => {
  const [lineUpArtist, setLineUpArtist] = useState(null);
  const [lastArtist, setLastArtist] = useState(null);
  const [lineUpInfos, setLineUpInfos] = useState();
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

  useEffect(() => {
    if (lineUpArtist) {
      axios
        .get(
          `https://www.theaudiodb.com/api/v1/json/523532/search.php?s=${lineUpArtist
            .toLowerCase()
            .replace(' ', '_')}`
        )
        .then((res) => {
          setLineUpInfos(res.data.artists);
        })
        .catch((err) => console.error(err.message));
    }
  }, [lineUpArtist]);

  const [openInfos, setOpenInfos] = useState('');
  // const changeClass = () => {
  //   setTimeout(() => {}, timeout);
  // };
  const handleClickShowArtist = (name) => {
    setLineUpArtist(name);
    if (lastArtist === name) {
      setOpenInfos('close');
      setLastArtist(null);
    } else if (!lastArtist) {
      setOpenInfos('open');
      setLastArtist(name);
    } else if (lastArtist !== name) {
      setLastArtist(lineUpArtist);
      setOpenInfos('close');
      setTimeout(() => {
        setOpenInfos('open');
      }, 2000);
    }
  };

  const spotifyLink = artist?.links.find((link) => link.type === 'spotify');
  const facebookLink = artist?.links.find((link) => link.type === 'facebook');
  const youtubeLink = artist?.links.find((link) => link.type === 'youtube');
  const soundcloudLink = artist?.links.find(
    (link) => link.type === 'soundcloud'
  );
  const spotifyUrl = spotifyLink ? spotifyLink.url : null;
  const facebookUrl = facebookLink ? facebookLink.url : null;
  const youtubeUrl = youtubeLink ? youtubeLink.url : null;
  const soundcloudUrl = soundcloudLink ? soundcloudLink.url : null;

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
              <li className='title-city-event'>
                {artistEvent.venue.name} - {artistEvent.venue.city}
              </li>

              <ul className='other-artist'>
                {artistEvent.lineup.map((name, index) => {
                  if (index === 4) {
                    return <li>Et d'autres...</li>;
                  } else if (index >= 5) {
                    return null;
                  } else if (index > 0) {
                    return (
                      <li
                        key={name}
                        onClick={() => handleClickShowArtist(name)}
                      >
                        {name}
                      </li>
                    );
                  }
                })}
              </ul>
              <li className='url-ticket'>
                <a href={artistEvent.url}>Acheter mon ticket</a>
              </li>
              <ul className='social-container'>
                {spotifyUrl ? (
                  <li className='social-media'>
                    <a href={spotifyUrl}>
                      <img src={spotify} alt='' className='spotify-icn' />
                    </a>
                  </li>
                ) : null}
                {soundcloudUrl ? (
                  <li className='social-media'>
                    <a href={soundcloudUrl}>
                      <img src={soundcloud} alt='' className='soundcloud-icn' />
                    </a>
                  </li>
                ) : null}
                {facebookUrl ? (
                  <li className='social-media'>
                    <a href={facebookUrl}>
                      <img src={facebook} alt='' className='facebook-icn' />
                    </a>
                  </li>
                ) : null}
                {youtubeUrl ? (
                  <li className='social-media'>
                    <a href={youtubeUrl}>
                      <img src={youtbe} alt='' className='youtube-icn-icn' />
                    </a>
                  </li>
                ) : null}
              </ul>
              <li className='video-cont'>
                <Video id={artistInfos[0].idArtist} />
              </li>
            </ul>
          </div>
          <div className={`artist-info ${openInfos}`}>
            {lineUpInfos ? (
              lineUpInfos[0].strBiographyFR ? (
                <p className='artist-descr'>{lineUpInfos[0].strBiographyFR}</p>
              ) : (
                <p className='artist-descr'>{lineUpInfos[0].strBiographyEN}</p>
              )
            ) : null}
            {lineUpInfos ? <Video id={lineUpInfos[0].idArtist} /> : null}
          </div>
        </div>
      )}
    </section>
  );
};

export default Card;
