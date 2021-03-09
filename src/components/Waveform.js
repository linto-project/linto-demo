import "./Waveform.css";
import React, { useEffect, useRef } from "react";

import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";

import colors from "../data/colors";

import { useGlobalContext } from "./Provider";

const formWaveSurferOptions = (ref, timelineRef) => ({
  container: ref,
  waveColor: "#757575",
  progressColor: "#424242",
  cursorColor: "#424242",
  backend: "MediaElement",
  barWidth: 3,
  barRadius: 3,
  responsive: false,
  hideScrollbar: true,

  plugins: [
    RegionPlugin.create(),
    TimelinePlugin.create({
      container: timelineRef,
    }),
  ],

  autoCenter: true,
  height: 100,
  normalize: true,

  // Use the PeakCac he to improve rendering speed of large waveforms.
  // partialRender: true,
});

export default function Waveform({
  url,
  zoom,
  synch,
  setSynch,
  play,
  volume,
  setAudioLoaded,
  setDurationSec,
}) {
  const waveformRef = useRef(null);
  const timelineRef = useRef(null);
  const wavesurfer = useRef(null);

  const { confDemo, Annotation, Player } = useGlobalContext();
  const { getConf } = confDemo;
  const { setAnnot, getAnnot } = Annotation;
  const { setTime } = Player;

  setAudioLoaded(true);

  useEffect(() => {
    setAudioLoaded(false);
    // setPlay(false);
    const options = formWaveSurferOptions(
      waveformRef.current,
      timelineRef.current
    );
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);

    // Playing audio
    wavesurfer.current.on("play", function() {
      setDurationSec(wavesurfer.current.getCurrentTime());
    });

    // Audioprocess: fire continously when audio is playing
    wavesurfer.current.on("audioprocess", function() {
      setTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on("waveform-ready", function() {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
      }
      fakeRegion();
      setAudioLoaded(true);
    });

    wavesurfer.current.on("seek", function() {
      setDurationSec(wavesurfer.current.getCurrentTime());
      setTime(wavesurfer.current.getCurrentTime());
    });

    return () => wavesurfer.current.destroy();
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    wavesurfer.current.zoom(zoom || 1);
  }, [zoom]);

  useEffect(() => {
    wavesurfer.current.setVolume(volume || 1);
  }, [volume]);

  useEffect(() => {
    if (play !== wavesurfer.current.isPlaying()) {
      wavesurfer.current.playPause();
    }
  }, [play]);

  const changeTimeline = getConf().annotation && getConf().locuteurActif;
  useEffect(() => {
    if (changeTimeline) {
      getAnnot().map((o) => handleAddRegionSimple(o));
    } else {
      wavesurfer.current.clearRegions();
    }
    // eslint-disable-next-line
  }, [changeTimeline]);

  const valueLocuteur = getConf().seuilLocuteur;
  useEffect(() => {
    if (changeTimeline) {
      wavesurfer.current.clearRegions();
      getAnnot().map((o) => handleAddRegionSimple(o));
    }
    // eslint-disable-next-line
  }, [valueLocuteur]);

  const fakeRegion = () => {
    let list = [];
    let increment = 1;
    for (var i = 0; i <= wavesurfer.current.getDuration(); i = i + increment) {
      increment = Math.random() * (5 - 1) + 1;
      let listItem = {};
      listItem["start"] = i;
      listItem["end"] = i + increment;
      const cosCalculate = Math.abs(Math.cos(i));
      listItem["confidence"] = cosCalculate;
      listItem["label"] = (Math.floor(Math.random() * (6 - 0)) + 0).toString();
      list.push(listItem);
    }
    setAnnot(list);
    if (getConf().map) {
      list.map((o) => handleAddRegionSimple(o));
    }
  };

  const handleAddRegionSimple = (analyse) => {
    if (analyse.label < 4) {
      if (analyse.confidence > valueLocuteur) {
        wavesurfer.current.addRegion({
          start: analyse.start,
          end: analyse.end,
          color: colors[analyse.label],
          drag: false,
          resize: false,
        });
      }
    }
  };

  return (
    <div className="root">
      <div className="waveform" id="waveform" ref={waveformRef} />
      <div id="timelineRef" ref={timelineRef} />
    </div>
  );
}
