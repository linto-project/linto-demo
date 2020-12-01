import { useState, useEffect, useRef } from "react";

import Video from "./Video";
import WaveSurfer from "./Waveform";

const VideoAudio = () => {
  const [durationSec, setDurationSec] = useState([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const [frame, setFrame] = useState([]);

  useEffect(() => {
    console.log("current State : " + isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    console.log("current timestamp : " + durationSec);
  }, [durationSec]);

  return (
    <div className="demo">
      <Video />
      <div id="waveform">
        <WaveSurfer
          url="/audio/IS1002b.Array1-01.wav"
          setIsPlaying={setIsPlaying}
          setDurationSec={setDurationSec}
        />
      </div>
      []
      <div>
        <p style={{ fontSize: "40px" }}>{frame}</p>
      </div>
    </div>
  );
};

export default VideoAudio;
