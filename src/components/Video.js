import { useEffect, useState, useRef } from "react";
import "./Video.css";
// import data from "../data/detect_meeting_RAP_1_b.json";

const Video = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  const videoRef = useRef(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    videoRef.current.currentTime = durationSec;
  }, [durationSec]);

  useEffect(() => {
    isPlaying ? videoRef.current.play() : videoRef.current.pause();
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

  // https://www.robinwieruch.de/react-function-component

  const canva = useRef(null);
  const fps = 30;
  const width = 1280;
  const height = 720;

  const drawImage = () => {
    canva.current
      .getContext("2d", { alpha: false })
      .drawImage(videoRef.current, 0, 0, width, height);

    console.log(" ");
  };

  // const drawRectangle = (x, y, w, h) => {
  //   canva.current.getContext("2d", { alpha: false }).strokeRect(y, x, h, w);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      drawImage();

      // data[Math.round(videoRef.current.currentTime * fps2)].map((o) =>
      //   drawRectangle(o.x, o.y, o.width, o.height)
      // );
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="video">
      <canvas
        style={{ zindex: "0" }}
        ref={canva}
        width="1280"
        height="720"
      ></canvas>
      <video
        key={url}
        preload
        ref={videoRef}
        width="1280"
        height="640"
        onCanPlayThrough={videoReady}
        hidden
        //   onTimeUpda te={onSetVideoTimestamp}
      >
        <source src={url} />
      </video>
    </div>
  );
};

export default Video;
