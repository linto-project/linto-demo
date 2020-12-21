import { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import "./Video.css";
import "./Video4Player.css";

import colors from "../data/colors";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: (props) => ({
    zIndex: 10,
    boxShadow: `0 0 100px 10px ${props.color} inset`,
    // border: `10px solid ${props.color}`,
    lineHeight: 0,
    outline: "none",
  }),
});

const Video4Player = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
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

  return (
    <div className="video">
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item className={useStyles({ color: colors[0] }).root}>
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
            <Grid item className={useStyles({ color: colors[1] }).root}>
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
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={1}>
            <Grid item className={useStyles({ color: colors[2] }).root}>
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
            <Grid item className={useStyles({ color: colors[3] }).root}>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Video4Player;
