import { useState, useEffect, useRef } from "react";

// import Button from "../components/Button";
import Rectangle from "../components/Rectangle";

import "./Demo.css";

import video1 from "./../video/Is1002b.Closeup1-1.webm";

const Demo = () => {
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
        <Rectangle top={posY} left={posX} width="100" height="180" />
      </div>
      <div className="position">
        {
          // eslint-disable-next-line
          <video
            controls
            ref={ref}
            src={video1}
            width="640"
            height="360"
            onTimeUpdate={onSetVideoTimestamp}
          />
        }
      </div>
      <div>
        <p style={{ fontSize: "40px" }}>{frame}</p>
      </div>
    </div>
  );
};

export default Demo;
