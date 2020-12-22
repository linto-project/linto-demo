import "./VideoAudio.css";
import { useState, useEffect } from "react";
import Video from "./Video";
import VideoAMI from "./VideoAmi";
import WaveSurfer from "./Waveform";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CustomeSlider from "./CustomSlider";
import Button from "./Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import VolumeUp from "@material-ui/icons/VolumeUp";
import ZoomOut from "@material-ui/icons/ZoomOut";
import PlayArrowSharpIcon from "@material-ui/icons/PlayArrowSharp";
import StopSharpIcon from "@material-ui/icons/StopSharp";

import { useGlobalContext } from "./Provider";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      zIndex: 1000000,
    },
  })
);

const VideoAudio = ({ framerate }) => {
  // console.log("framerate  : " + framerate);

  const [durationSec, setDurationSec] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [frame, setFrame] = useState([]);
  const [play, setPlay] = useState(false);
  const [synch, setSynch] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(5);

  const [audioLoaded, setAudioLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playDisabled, setPlayDisabled] = useState(true);

  const [open, setOpen] = useState(false);

  const { File } = useGlobalContext();

  const handleClose = () => {
    setOpen(false);
  };

  const nameFile = File.getName();
  useEffect(() => {
    setVideoLoaded(false);
    setPlay(false);
  }, [nameFile]);

  useEffect(() => {
    // console.log("current State : " + isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    // console.log("current timestamp : " + durationSec);
    setFrame(Math.round(durationSec * 25));
  }, [durationSec]);

  useEffect(() => {
    audioLoaded && videoLoaded ? setPlayDisabled(false) : setPlayDisabled(true);
    audioLoaded && videoLoaded ? setOpen(false) : setOpen(true);
  }, [audioLoaded, videoLoaded]);

  const handlePlayPause = () => {
    if (!playDisabled) {
      setPlay(!play);
    }
  };

  const classes = useStyles();
  return (
    <div className="demo">
      {/* @to do:
        Modifiy  d backdrop for skeleton (material)
      */}
      <Backdrop className={classes.root} open={open} onClick={handleClose}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <CircularProgress color="primary" size={60} thickness={5.4} />
          </Grid>
          <Grid item>
            <Typography
              style={{
                color: "white",
                textShadow:
                  "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              }}
            >
              Video & Audio loading, please wait
            </Typography>
          </Grid>
        </Grid>
      </Backdrop>
      <Grid container direction="column" spacing={2}>
        <Grid item justify="center">
          {File.getReunionName() === "Linto" && (
            <Video
              url={"/video/" + File.getName() + ".webm"}
              durationSec={durationSec}
              isPlaying={isPlaying}
              setVideoLoaded={setVideoLoaded}
            />
          )}
          {File.getReunionName() === "AMI" && (
            <VideoAMI
              url={"/video/AMI/1/"}
              durationSec={durationSec}
              isPlaying={isPlaying}
              setVideoLoaded={setVideoLoaded}
            />
          )}
        </Grid>
        <Grid item>
          <div id="waveform">
            <WaveSurfer
              url={"/audio/" + File.getName() + ".wav"}
              zoom={zoom}
              synch={synch}
              setSynch={setSynch}
              play={play}
              setPlay={setPlay}
              volume={volume}
              audioLoaded={audioLoaded}
              setAudioLoaded={setAudioLoaded}
              playDisabled={playDisabled}
              setPlayDisabled={setPlayDisabled}
              setIsPlaying={setIsPlaying}
              setDurationSec={setDurationSec}
              setFrame={setFrame}
              framerate={framerate}
            />
          </div>
        </Grid>
        <Grid item>
          <div>
            <Grid container spacing={2} alignItems="center">
              <Grid item align-items="baseline">
                <div className="control">
                  <Button
                    style={{ maxWidth: "100px", minWidth: "100px" }}
                    variant="contained"
                    color="primary"
                    onClick={handlePlayPause}
                    fullWidth="false"
                    disabled={playDisabled}
                    startIcon={
                      !play ? <PlayArrowSharpIcon /> : <StopSharpIcon />
                    }
                  >
                    {!play ? "Play" : "Pause"}
                  </Button>
                </div>
              </Grid>
              <Grid xs item>
                <CustomeSlider
                  id="volume"
                  name="volume"
                  value={volume}
                  onChange={setVolume}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={1}
                  step={0.01}
                  icon={<VolumeUp />}
                  valueLabelDisplay="auto"
                >
                  Volume
                </CustomeSlider>
              </Grid>
              <Grid xs item>
                <CustomeSlider
                  id="zoom"
                  name="zoom"
                  value={zoom}
                  onChange={setZoom}
                  aria-labelledby="continuous-slider"
                  min={1}
                  max={10}
                  step={0.1}
                  icon={<ZoomOut />}
                  valueLabelDisplay="auto"
                >
                  Zoom
                </CustomeSlider>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item>
          <div>
            <p style={{ fontSize: "40px" }}>Current frame: {frame}</p>
            <p>Test selected file: {File.getName()}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoAudio;
