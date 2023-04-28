import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const Video = ({ id }) => {
  const [urlVideo, setUrlVideo] = useState("");
  const [playing, setPlaying] = useState(true);
  console.log(id);
  useEffect(() => {
    axios
      .get(`https://theaudiodb.com/api/v1/json/523532/mvid.php?i=${id}`)
      .then((res) => {
        setUrlVideo(
          res.data.mvids[Math.floor(Math.random() * res.data.mvids.length)]
            .strMusicVid
        );
        console.log(
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
          className="card-video"
          onReady={() => setPlaying(true)}
          playing={playing}
          url={urlVideo}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      }
    </div>
  );
};

export default Video;
