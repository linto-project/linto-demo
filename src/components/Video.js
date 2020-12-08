import { useEffect, useState, useRef } from "react";
import "./Video.css";

const Video = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  const video = useRef(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    video.current.currentTime = durationSec;
  }, [durationSec]);

  useEffect(() => {
    isPlaying ? video.current.play() : video.current.pause();
  }, [isPlaying]);

  const videoReady = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    //Dummy to force reload
    setState(state + 1);
    console.log(state);
    // eslint-disable-next-line
  }, [url]);

  return (
    <div className="video">
      <video
        key={url}
        preload
        ref={video}
        width="640"
        height="360"
        onCanPlayThrough={videoReady}
        //   onTimeUpda te={onSetVideoTimestamp}
      >
        <source src={url} />
      </video>
    </div>
  );
};

export default Video;
