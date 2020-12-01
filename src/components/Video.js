import { useEffect, useRef } from "react";

const Video = ({
  url,
  isPlaying,
  setIsPlaying,
  durationSec,
  setDurationSec,
}) => {
  const video = useRef(null);

  useEffect(() => {
    video.current.currentTime = durationSec;
  }, [durationSec]);

  useEffect(() => {
    isPlaying ? video.current.play() : video.current.pause();
  }, [isPlaying]);

  return (
    <video
      preload
      //   ref={ref}
      ref={video}
      src={url}
      width="640"
      height="360"
      //   onTimeUpda te={onSetVideoTimestamp}
    />
  );
};

export default Video;
