import { useState, useEffect, useRef } from "react";

import Button from "../components/Button";
import Rectangle from "../components/Rectangle";

import "./Demo.css";

import video1 from "./../video/Is1002b.Closeup1-1.webm";

const Demo = () => {
  const [button, setButton] = useState([]);
  const [frame, setFrame] = useState([]);

  let ref = useRef(null);
  let numFrame = 0;

  const toggleFilter = (filter) => {
    if (button.includes(filter)) {
      setButton(button.filter((t) => t !== filter));
    } else {
      setButton([...button, filter]);
    }
  };

  const isButtonSelected = (p) => button.includes(p);

  useEffect(() => {
    console.log("button: ", button);
    // eslint-disable-next-line
  }, [button]);

  const onSetVideoTimestamp = (event) => {
    const timestamp = event.currentTarget.currentTime;
    numFrame = Math.round(event.currentTarget.currentTime * 30);
    setFrame(numFrame);
    console.log(timestamp);
  };

  return (
    <div className="demo">
      {/* <div
        className="position overlay"
        style={{
          position: "absolute",
          left: String(680 / 2 - 100) + "px",
          top: String(400 / 2 - 100) + "px",
        }}
      /> */}
      <div>
        <Rectangle top="100" left="100" width="50" height="50" />
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

      {/* <div className="grid">
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleFilter("video")}
          selected={isButtonSelected("video")}
        >
          Détection de locuteur audio
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toggleFilter("audio")}
          selected={isButtonSelected("audio")}
        >
          Détection de locuteur vidéo
        </Button>
      </div> */}
    </div>
  );
};

export default Demo;
