import { useState, useEffect, useRef } from "react";

import Rectangle from "../components/Rectangle";
import "./Demo.css";

import WaveSurfer from "../components/Waveform";

const Demo = () => {
  // const [button, setButton] = useState([]);

  const [frame, setFrame] = useState([]);
  const [frameLastRefresh, setFrameLastRefresh] = useState([]);

  const [posX, setPosX] = useState([]);
  const [posY, setPosY] = useState([]);

  let ref = useRef(null);

  useEffect(() => {
    if (Math.abs(frame - frameLastRefresh) >= 1) {
      setFrameLastRefresh(frame);
      // Just a random
      setPosX(380 + Math.floor(Math.random() * Math.floor(50)) - 25);
      setPosY(250 + Math.floor(Math.random() * Math.floor(50)) - 25);
    } // eslint-disable-next-line
  }, [frame]);

  const onSetVideoTimestamp = (event) => {
    const timestamp = event.currentTarget.currentTime;
    setFrame(Math.round(event.currentTarget.currentTime * 30));
    console.log(timestamp);
  };

  return (
    <div className="demo">
      <div>
        {/* <Rectangle top={posY} left={posX} width="100" height="180" /> */}
      </div>
      <div className="position">
        {/* {
          <video
            controls
            ref={ref}
            src={video1}
            width="640"
            height="360"
            onTimeUpdate={onSetVideoTimestamp}
          />
        } */}
      </div>

      <div id="waveform">
        <WaveSurfer url="audio/IS1002b.Array1-01.wav" />
      </div>
      <div>
        <p style={{ fontSize: "40px" }}>{frame}</p>
      </div>
    </div>
  );
};

export default Demo;
