import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";

import Video from "./Video.js";

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
  partialRender: true,
});

export default function Waveform({ url, setIsPlaying, setDurationSec }) {
  const waveformRef = useRef(null);
  const timelineRef = useRef(null);

  const wavesurfer = useRef(null);

  const [playing, setPlay] = useState(false);

  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(1);

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

    wavesurfer.current.on("pause", function () {
      console.log("Pause");
      setIsPlaying(false);
    });

    wavesurfer.current.on("play", function () {
      console.log("Play");
      setIsPlaying(true);
      setDurationSec(wavesurfer.current.getCurrentTime());
    });

    return () => wavesurfer.current.destroy();
    // eslint-disable-next-line
  }, [url]);

  const handlePlayPause = () => {
    if (!playDisabled) {
      setPlay(!playing);
      wavesurfer.current.playPause();
    }
  };

  const onVolumeChange = (e) => {
    const newVolume = e.target.value;
    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
      console.log("volume : " + newVolume);
    }
  };

  const onZoomChange = (e) => {
    const newZoom = e.target.value;
    if (newZoom) {
      setZoom(newZoom);
      wavesurfer.current.zoom(zoom || 1);
      console.log("Zoom : " + zoom);
    }
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div id="timelineRef" ref={timelineRef} />
      <div className="controls">
        <button onClick={handlePlayPause} disabled={playDisabled}>
          {!playing ? "Play" : "Pause"}
        </button>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <label htmlFor="volume">Volume</label>
        <input
          type="range"
          id="timelineRef"
          name="timelineRef"
          min="1"
          max="20"
          step=".01"
          onChange={onZoomChange}
          defaultValue={zoom}
        />
      </div>
    </div>
  );
}
