import "./VideoAudio.css";
import { useState, useEffect } from "react";
import Video from "./Video";
import VideoAMI from "./VideoAmi";
import VideoGestes from "./VideoGestes";
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

import { TranscriptReadOnly } from "./Transcript";
// you need to import bootstrap separatly
import "bootstrap-css-only";

// Use style to over ride Z-index of backdrop
// (Otherwise, its zIndex is lower than video.)
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      zIndex: 1000000,
    },
  })
);

const VideoAudio = ({ framerate }) => {
  const [durationSec, setDurationSec] = useState([]);
  const [synch, setSynch] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(5);

  const [audioLoaded, setAudioLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playDisabled, setPlayDisabled] = useState(true);

  const [open, setOpen] = useState(false);

  const { File, Player } = useGlobalContext();

  const handleClose = () => {
    setOpen(false);
  };

  const nameFile = File.getName();
  useEffect(() => {
    setVideoLoaded(false);
    // setPlay(false);
  }, [nameFile]);

  useEffect(() => {
    audioLoaded && videoLoaded ? setPlayDisabled(false) : setPlayDisabled(true);
    audioLoaded && videoLoaded ? setOpen(false) : setOpen(true);
  }, [audioLoaded, videoLoaded]);

  // Rename: toggle play/pause
  const handlePlayPause = () => {
    if (!playDisabled) {
      Player.togglePlaying();
    }
  };

  const classes = useStyles();

  return (
    <div className="demo">
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
      <Grid container direction="column" justify="center" spacing={2}>
        <Grid item>
          {File.getReunionName() === "Linto" && (
            <Video
              url={"/video/linto/RAP1-Blur-1-6min-16min.webm"}
              durationSec={durationSec}
              isPlaying={Player.getPlaying()}
              setVideoLoaded={setVideoLoaded}
            />
          )}

          {File.getReunionName() === "Gestes" && (
            <VideoGestes
              url={"/video/Gestes/Original.webm"}
              durationSec={durationSec}
              isPlaying={Player.getPlaying()}
              setVideoLoaded={setVideoLoaded}
            />
          )}
          {File.getReunionName() === "AMI" && (
            <VideoAMI
              url={"/video/AMI/1/"}
              durationSec={durationSec}
              isPlaying={Player.getPlaying()}
              setVideoLoaded={setVideoLoaded}
            />
          )}
          {File.getReunionName() === "Linto" && <TranscriptReadOnly />}
        </Grid>

        <Grid item>
          <div id="waveform">
            <WaveSurfer
              url={
                "/audio/" +
                File.getReunionName() +
                "/" +
                File.getName() +
                ".wav"
              }
              // url={"/video-ignore/meeting_RAP_4.wav"}
              zoom={zoom}
              synch={synch}
              setSynch={setSynch}
              play={Player.getPlaying()}
              // setPlay={setPlay}
              volume={volume}
              audioLoaded={audioLoaded}
              setAudioLoaded={setAudioLoaded}
              playDisabled={playDisabled}
              setPlayDisabled={setPlayDisabled}
              // setIsPlaying={Player.getSetterPlaying()}
              setDurationSec={setDurationSec}
              // setFrame={setFrame}
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
                    onClick={(e) => handlePlayPause()}
                    disabled={playDisabled}
                    startIcon={
                      !Player.getPlaying() ? (
                        <PlayArrowSharpIcon />
                      ) : (
                        <StopSharpIcon />
                      )
                    }
                  >
                    {!Player.getPlaying() ? "Play" : "Pause"}
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
                  min={0.01}
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
                  min={5}
                  max={20}
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
        {/* <Grid item>
          <div>
            <p style={{ fontSize: "40px" }}>Current frame: {frame}</p>
            <p>Test selected file: {File.getName()}</p>
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default VideoAudio;
