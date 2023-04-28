import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const Video = ({ id }) => {
  const [urlsVideos, setUrlsVideos] = useState([]);
  console.log(id);
  useEffect(() => {
    axios
      .get(`https://theaudiodb.com/api/v1/json/523532/mvid.php?i=${id}`)
      .then((res) => {
        setUrlsVideos(res.data.mvids[0].strMusicVid);
        console.log(res.data.mvids[0].strMusicVid);
      })
      .catch((err) => console.error(err.message));
    console.log(urlsVideos);
  }, [id]);

  return <div>{/* <ReactPlayer url={urlsVideos} /> */}</div>;
};

export default Video;
