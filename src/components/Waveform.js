import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#e1bee7",
  cursorColor: "#ce93d8",
  barWidth: 3,
  barRadius: 3,

  //   backend: "MediaElement",
  //   renderer: "MultiCanvas",
  //   pixelRatio: 1,
  //   timeInterval: 30,

  autoCenter: true,
  //   minPxPerSec: 1,

  height: 100,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);

  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(1);

  const [playDisabled, setPlayDisabled] = useState(true);

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
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

    return () => wavesurfer.current.destroy();
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

  //   const zoomLess = () => {
  //     setZoom(zoom / 10);
  //     onZoomChange();
  //   };

  //   const zoomMore = () => {
  //     setZoom(zoom * 10);
  //     onZoomChange();
  //   };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
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
          id="timeline"
          name="timeline"
          min="1"
          max="20"
          step=".01"
          onChange={onZoomChange}
          defaultValue={zoom}
        />
        {/* <button onClick={zoomLess} disabled={playDisabled}>
          Zoom -
        </button>
        <button onClick={zoomMore} disabled={playDisabled}>
          Zoom +
        </button> */}
      </div>
    </div>
  );
}
