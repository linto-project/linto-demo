import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";

import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CustomeSlider from "./CustomeSlider";

import VolumeUp from "@material-ui/icons/VolumeUp";
import ZoomOut from "@material-ui/icons/ZoomOut";

const formWaveSurferOptions = (ref, timelineRef) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#e1bee7",
  cursorColor: "#ce93d8",
  backend: "MediaElement",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  hideScrollbar: true,

  plugins: [
    TimelinePlugin.create({
      container: timelineRef,
    }),
  ],

  autoCenter: true,
  height: 100,
  normalize: true,

  // Use the PeakCache to improve rendering speed of large waveforms.
  // partialRender: true,
});

export default function Waveform({
  url,
  isPlaying,
  setIsPlaying,
  durationSec,
  setDurationSec,
  frame,
  setFrame,
}) {
  const waveformRef = useRef(null);
  const timelineRef = useRef(null);

  const wavesurfer = useRef(null);

  const [playing, setPlay] = useState(false);
  const [synch, setSynch] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(5);

  const [playDisabled, setPlayDisabled] = useState(true);

  useEffect(() => {
    setPlay(false);
    const options = formWaveSurferOptions(
      waveformRef.current,
      timelineRef.current
    );
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
        setZoom(zoom);
      }
      setPlayDisabled(false);
    });

    // Pausing audio
    wavesurfer.current.on("pause", function () {
      console.log("Pause");
      setIsPlaying(false);
    });

    // Playing audio
    wavesurfer.current.on("play", function () {
      console.log("Play");
      setIsPlaying(true);
      setDurationSec(wavesurfer.current.getCurrentTime());
    });

    // Interaction with audio
    wavesurfer.current.on("interaction", function () {
      console.log("Interaction");
      setSynch(true);
    });

    // Audioprocess: fire continously when audio is playing
    wavesurfer.current.on("audioprocess", function () {
      console.log("hey");
      calculateFrame();
    });

    return () => wavesurfer.current.destroy();
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    console.log("synch" + synch);
    setDurationSec(wavesurfer.current.getCurrentTime());
    setSynch(false);
    // eslint-disable-next-line
  }, [synch]);

  const calculateFrame = () => {
    setFrame(Math.round(wavesurfer.current.getCurrentTime() * 25));
  };

  const handlePlayPause = () => {
    if (!playDisabled) {
      setPlay(!playing);
      wavesurfer.current.playPause();
    }
  };

  const onVolumeChange = (e, newValue) => {
    if (newValue) {
      setVolume(newValue);
      wavesurfer.current.setVolume(newValue || 1);
      console.log("volume : " + newValue);
    }
  };

  const onZoomChange = (e, newValue) => {
    if (newValue) {
      setZoom(newValue);
      wavesurfer.current.zoom(newValue || 1);
      console.log("Zoom : " + newValue);
    }
  };

  return (
    <div className="root">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <div id="waveform" ref={waveformRef} />
          <div id="timelineRef" ref={timelineRef} />
        </Grid>
        {/* <div className="controls">
          <button onClick={handlePlayPause} disabled={playDisabled}>
            {!playing ? "Play" : "Pause"}
          </button>
        </div> */}
        <Grid item>
          <Grid spacing={1} container>
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
    // {/* <grid itemxs>
    //   <label htmlFor="timelineRef">Timeline Zoom</label>
    //   <input
    //     type="range"
    //     id="timelineRef"
    //     name="timelineRef"
    //     min="5"
    //     max="10"
    //     step=".01"
    //     onChange={onZoomChange}
    //     defaultValue={zoom}
    //   />
    // </grid> */}
  );
}
