import "./Demo.css";

import WaveSurfer from "../components/Waveform";

const Demo = () => {
  return (
    <div className="demo">
      <div id="waveform">
        <WaveSurfer url="audio/IS1002b.Array1-01.wav" />
      </div>
    </div>
  );
};

export default Demo;
