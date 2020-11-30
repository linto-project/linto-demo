import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import "./Waveform.css";

import test from "../audio/IS1002b.Array1-01.wav";

class Waveform extends Component {
  state = {
    playing: false,
  };

  componentDidMount() {
    const track = document.querySelector("#track");

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: "#2D5BFF",
      normalize: true,
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
    });

    this.waveform.load(test);

    const slider = document.querySelector("#slider");

    slider.addEventListener(
      "input",
      this.waveform.util.debounce(function () {
        this.waveform.zoom(Number(this.value));
      }, 100)
    );
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

    return (
      <div className="WaveformContianer">
        <div className="PlayButton" onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </div>
        <div className="Wave" id="waveform" />
        <audio id="track" src={test} />
        <input id="slider" type="range" min="1" max="200" value="1" />
      </div>
    );
  }
}

export default Waveform;
