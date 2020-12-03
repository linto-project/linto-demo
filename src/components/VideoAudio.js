// import { duration } from "@material-ui/core";
import { useState, useEffect } from "react";
import Video from "./Video";
import WaveSurfer from "./Waveform";

import Grid from "@material-ui/core/Grid";
import CustomeSlider from "./CustomeSlider";

import VolumeUp from "@material-ui/icons/VolumeUp";
import ZoomOut from "@material-ui/icons/ZoomOut";

const VideoAudio = () => {
  const [durationSec, setDurationSec] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [frame, setFrame] = useState([]);

  const [play, setPlay] = useState(false);
  const [synch, setSynch] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(5);

  const [playDisabled, setPlayDisabled] = useState(true);

  useEffect(() => {
    console.log("current State : " + isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    console.log("current timestamp : " + durationSec);
    setFrame(Math.round(durationSec * 25));
  }, [durationSec]);

  const handlePlayPause = () => {
    if (!playDisabled) {
      setPlay(!play);
    }
  };

  const onVolumeChange = (e, newValue) => {
    if (newValue) {
      setVolume(newValue);
    }
  };

  const onZoomChange = (e, newValue) => {
    if (newValue) {
      setZoom(newValue);
    }
  };

  return (
    <div className="demo">
      {/* @todo: make sure that video plays only when preloaded */}
      <div>
        <p style={{ fontSize: "40px" }}>Current frame: {frame}</p>
      </div>
      <Video
        url="/video/IS1002b.Closeup1-1-5min.webm"
        durationSec={durationSec}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setDurationSec={setDurationSec}
      />
      <div id="waveform">
        <WaveSurfer
          url="/audio/IS1002b.Array1-01-5min.wav"
          zoom={zoom}
          setZoom={setZoom}
          synch={synch}
          setSynch={setSynch}
          play={play}
          setPlay={setPlay}
          volume={volume}
          setVolume={setVolume}
          playDisabled={playDisabled}
          setPlayDisabled={setPlayDisabled}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          durationSec={durationSec}
          setDurationSec={setDurationSec}
          frame={frame}
          setFrame={setFrame}
        />
      </div>

      <div className="root">
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item align="center">
                <div className="controls">
                  <button onClick={handlePlayPause} disabled={playDisabled}>
                    {!play ? "Play" : "Pause"}
                  </button>
                </div>
              </Grid>
              <Grid xs item>
                <CustomeSlider
                  id="volume"
                  name="volume"
                  value={volume}
                  onChange={onVolumeChange}
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
                  onChange={onZoomChange}
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default VideoAudio;
