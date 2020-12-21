import { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import "./Video.css";
// import data from "../data/detect_meeting_RAP_1_b.json";

const VideoAMI = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    videoRef1.current.currentTime = durationSec;
    videoRef2.current.currentTime = durationSec;
    videoRef3.current.currentTime = durationSec;
    videoRef4.current.currentTime = durationSec;
  }, [durationSec]);

  useEffect(() => {
    isPlaying ? videoRef1.current.play() : videoRef1.current.pause();
    isPlaying ? videoRef2.current.play() : videoRef2.current.pause();
    isPlaying ? videoRef3.current.play() : videoRef3.current.pause();
    isPlaying ? videoRef4.current.play() : videoRef4.current.pause();
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

  const canva1 = useRef(null);
  const canva2 = useRef(null);
  const canva3 = useRef(null);
  const canva4 = useRef(null);
  const fps = 25;
  // const fps2  = 30;
  const width = 352;
  const height = 288;

  const drawImage = () => {
    canva1.current
      .getContext("2d", { alpha: false })
      .drawImage(videoRef1.current, 0, 0, width, height);
    // canva2.current
    //   .getContext("2d", { alpha: false })
    //   .drawImage(videoRef2.current, 0, 0, width, height);
    // canva3.current
    //   .getContext("2d", { alpha: false })
    //   .drawImage(videoRef3.current, 0, 0, width, height);
    // canva4.current
    //   .getContext("2d", { alpha: false })
    //   .drawImage(videoRef4.current, 0, 0, width, height);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      drawImage();
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="video">
      <Grid container justify="center" spacing={0}>
        <Grid xs={5} item>
          <canvas
            style={{ zindex: "0" }}
            ref={canva1}
            width="352"
            height="288"
          ></canvas>
        </Grid>
        <Grid xs={5} item>
          <canvas
            style={{ zindex: "0" }}
            ref={canva2}
            width="352"
            height="288"
          ></canvas>
        </Grid>
        <Grid xs={5} item>
          <canvas
            style={{ zindex: "0" }}
            ref={canva3}
            width="352"
            height="288"
          ></canvas>
        </Grid>
        <Grid xs={5} item>
          <canvas
            style={{ zindex: "0" }}
            ref={canva4}
            width="352"
            height="288"
          ></canvas>
        </Grid>
      </Grid>

      <Grid container justify="center" spacing={0}>
        <Grid xs={5} item>
          <video
            key={url}
            preload
            ref={videoRef1}
            width="352"
            height="288"
            onCanPlayThrough={videoReady}
          >
            <source src={url + "Closeup1.m4v"} />
          </video>
        </Grid>
        <Grid xs={5} item>
          <video
            key={url}
            preload
            ref={videoRef2}
            width="352"
            height="288"
            onCanPlayThrough={videoReady}
          >
            <source src={url + "Closeup3.m4v"} />
          </video>
        </Grid>
        <Grid xs={5} item>
          <video
            key={url}
            preload
            ref={videoRef3}
            width="352"
            height="288"
            onCanPlayThrough={videoReady}
          >
            <source src={url + "Closeup4.m4v"} />
          </video>
        </Grid>
        <Grid xs={5} item>
          <video
            key={url}
            preload
            ref={videoRef4}
            width="352"
            height="288"
            onCanPlayThrough={videoReady}
          >
            <source src={url + "Closeup2.m4v"} />
          </video>
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoAMI;
