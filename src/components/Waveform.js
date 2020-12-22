import "./Waveform.css";
import React, { useEffect, useState, useRef } from "react";

import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";

import Grid from "@material-ui/core/Grid";
import colors from "../data/colors";

import { useGlobalContext } from "./Provider";

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
  setPlay,
  volume,
  setAudioLoaded,
  setIsPlaying,
  setDurationSec,
  framerate,
  setFrame,
}) {
  const waveformRef = useRef(null);
  const timelineRef = useRef(null);
  const wavesurfer = useRef(null);

  const { confDemo, annotation } = useGlobalContext();
  const { setConf, getSetterConf, getConf } = confDemo;
  const { setAnnot, getAnnot } = annotation;

  useEffect(() => {
    setAudioLoaded(false);
    setPlay(false);
    const options = formWaveSurferOptions(
      waveformRef.current,
      timelineRef.current
    );
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);

    // Pausing audio
    wavesurfer.current.on("pause", function () {
      // console.log("Pause");
      setIsPlaying(false);
    });

    // Playing audio
    wavesurfer.current.on("play", function () {
      // console.log("Play");
      setIsPlaying(true);
      setDurationSec(wavesurfer.current.getCurrentTime());
    });

    // Interaction with audio
    wavesurfer.current.on("interaction", function () {
      // console.log("Interaction");
      setSynch(true);
    });

    // Audioprocess: fire continously when audio is playing
    wavesurfer.current.on("audioprocess", function () {
      // wavesurfer.current.clearRegions();
      // console.log("hey");
      calculateFrame();
      // jsonInfo.map((o) => handleAddRegion(o));
    });

    wavesurfer.current.on("waveform-ready", function () {
      // console.log("ready");
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
      }
      fakeRegion();
      setAudioLoaded(true);
    });

    return () => wavesurfer.current.destroy();
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    // console.log("synch" + synch);
    setDurationSec(wavesurfer.current.getCurrentTime());
    setSynch(false);
    // eslint-disable-next-line
  }, [synch]);

  useEffect(() => {
    wavesurfer.current.zoom(zoom || 1);
  }, [zoom]);

  useEffect(() => {
    wavesurfer.current.setVolume(volume || 1);
  }, [volume]);

  useEffect(() => {
    wavesurfer.current.playPause();
  }, [play]);

  const changeTimeline = getConf().annotation && getConf().locuteurActif;
  useEffect(() => {
    if (changeTimeline) {
      getAnnot().map((o) => handleAddRegionSimple(o));
    } else {
      wavesurfer.current.clearRegions();
    }
  }, [changeTimeline]);

  const valueLocuteur = getConf().seuilLocuteur;
  useEffect(() => {
    wavesurfer.current.clearRegions();
    getAnnot().map((o) => handleAddRegionSimple(o));
  }, [valueLocuteur]);

  const calculateFrame = () => {
    setFrame(Math.round(wavesurfer.current.getCurrentTime() * framerate));
  };

  const fakeRegion = () => {
    console.log("Duration of clip : " + wavesurfer.current.getDuration());
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
    console.log(list);
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

  // const handleAddRegion = (analyse) => {
  //   // Add region

  //   if (analyse.start < wavesurfer.current.getCurrentTime()) {
  //     let end;
  //     if (analyse.end > wavesurfer.current.getCurrentTime()) {
  //       end = wavesurfer.current.getCurrentTime();
  //     } else {
  //       end = analyse.end;
  //     }
  //     wavesurfer.current.addRegion({
  //       start: analyse.start,
  //       end: analyse.end,
  //       color: colors[analyse.label],
  //     });
  //   }
  // };

  // const handleAddRegion = (analyse) => {
  //   // Add region

  //   if (analyse.start < wavesurfer.current.getCurrentTime()) {
  //     // let end;
  //     if (analyse.end > wavesurfer.current.getCurrentTime()) {
  //       // end = wavesurfer.current.getCurrentTime();
  //     } else {
  //       // end = analyse.end;
  //     }
  //     // wavesurfer.current.addRegion({
  //     //   sta rt: analyse.start,
  //     //   end: end,
  //     //   color: analyse.color,
  //     // });
  //   }
  // };

  return (
    <div className="root">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <div className="waveform" id="waveform" ref={waveformRef} />
          <div id="timelineRef" ref={timelineRef} />
        </Grid>
      </Grid>
    </div>
  );
}
