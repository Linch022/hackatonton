import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const Video = ({ id }) => {
  const [urlVideo, setUrlVideo] = useState('');
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    axios
      .get(`https://theaudiodb.com/api/v1/json/523532/mvid.php?i=${id}`)
      .then((res) => {
        setUrlVideo(
          res.data.mvids[Math.floor(Math.random() * res.data.mvids.length)]
            .strMusicVid
        );
      })
      .catch((err) => console.error(err.message));
  }, [id]);

  return (
    <div>
      {
        <ReactPlayer
          className='card-video'
          playing={playing}
          url={urlVideo}
          config={{
            youtube: {
              playerVars: { showinfo: 1, controls: 2 },
            },
          }}
        />
      }
    </div>
  );
};

export default Video;
