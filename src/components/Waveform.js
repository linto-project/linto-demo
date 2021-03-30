import "./Waveform.css";
import React, { useEffect, useRef } from "react";

import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";

// import colors from "../data/colors";
import colorsPerson from "../data/colorsPerson";

import annotAudio from "../data/Linto/audio.json";
import annotAudioAMI from "../data/Linto/ami2.json";

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

  const { confDemo, File, Annotation, Player } = useGlobalContext();
  const { getConf } = confDemo;
  const { setAnnot, getAnnot } = Annotation;
  const { setTime } = Player;
  const { getReunionName } = File;

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
    generateRegion();

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

  const annot = getAnnot();
  useEffect(() => {
    console.log(annot);
  }, [annot]);

  useEffect(() => {
    if (play !== wavesurfer.current.isPlaying()) {
      wavesurfer.current.playPause();
    }
  }, [play]);

  const changeTimeline = getConf().annotation && getConf().locuteurActif;
  const timelineAnnot = getConf().typeAnnotationSignature;

  const name = getReunionName();

  const valueLocuteur = getConf().seuilLocuteur;
  useEffect(() => {
    if (changeTimeline) {
      wavesurfer.current.clearRegions();
      // console.log(getAnnot());
      // console.log(typeof getAnnot());

      // Object.entries(getAnnot()).map((k, v) =>
      //   console.log("key " + k + ", value : " + v)
      // );
      const annot = getAnnot();
      for (const key in annot) {
        if (annot.hasOwnProperty(key)) {
          var temp = key.split("_");

          const beginTime = name === "Linto" ? 33 * 60 + 11 : 0;

          const endTime = beginTime + wavesurfer.current.getDuration();

          console.log("begin time : " + beginTime);
          console.log("end time : " + endTime);

          if (
            !(parseFloat(temp[0]) > endTime || parseFloat(temp[1]) < beginTime)
          ) {
            // Getting speaker
            console.log(parseFloat(temp[0]) + " -> " + parseFloat(temp[1]));
            const analyse = annot[key];
            let minValue = 10000;
            let minSpeak = "";
            let spkVT = "";
            for (const keySpeak in analyse) {
              // console.log(keySpeak + " -> " + analyse[keySpeak]["pred"]);
              if (minValue > parseFloat(analyse[keySpeak]["pred"])) {
                minValue = parseFloat(analyse[keySpeak]["pred"]);
                minSpeak = keySpeak;
              }
              if (parseInt(analyse[keySpeak]["VT"]) === 1) {
                // console.log("cc");
                spkVT = keySpeak;
              }
            }
            // console.log("Min speaker : " + minSpeak);
            wavesurfer.current.addRegion({
              start: parseFloat(temp[0]) - beginTime,
              end: parseFloat(temp[1]) - beginTime,
              // color: colorsPerson[minSpeak],
              color:
                timelineAnnot !== "ML"
                  ? colorsPerson[spkVT]
                  : colorsPerson[minSpeak],
              drag: false,
              resize: false,
            });

            // console.log("");
          }
        }
      }
      // console.log(getAnnot["0"]);
      // getAnnot.map((o) => handleAddRegion(o));
    } else {
      wavesurfer.current.clearRegions();
    }
    // eslint-disable-next-line
  }, [valueLocuteur, changeTimeline, timelineAnnot, name]);

  const generateRegion = () => {
    name === "Linto" ? setAnnot(annotAudio) : setAnnot(annotAudioAMI);
  };

  return (
    <div className="root">
      <div className="waveform" id="waveform" ref={waveformRef} />
      <div id="timelineRef" ref={timelineRef} />
    </div>
  );
}
