import { useState, useEffect } from "react";
import Button from "../components/Button";
import "./Demo.css";

import imageVideo from "./../images/video.png";
import imageAudioVideo from "./../images/audiovideo.png";
import imageAudio from "./../images/audio.png";
import imageNormal from "./../images/normal.png";

const Demo = () => {
  const [button, setButton] = useState([]);

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

  return (
    <div className="demo">
      <div classname="grid">
        {!isButtonSelected("video") && !isButtonSelected("audio") && (
          // eslint-disable-next-line
          <video
            src="Is1002b.Closeup1-1.m4v"
            width="640"
            height="360"
            preload
            autoplay
          >
            {" "}
          </video>
        )}
        {!isButtonSelected("video") && isButtonSelected("audio") && (
          // eslint-disable-next-line
          <video
            src="Is1002b.Closeup1-1.m4v"
            width="640"
            height="360"
            preload
            autoplay
          >
            {" "}
          </video>
        )}
        {isButtonSelected("video") && !isButtonSelected("audio") && (
          // eslint-disable-next-line
          <video
            src="Is1002b.Closeup1-1.m4v"
            width="640"
            height="360"
            preload
            autoplay
          >
            {" "}
          </video>
        )}
        {isButtonSelected("video") && isButtonSelected("audio") && (
          // eslint-disable-next-line
          <video
            src="Is1002b.Closeup1-1.m4v"
            width="640"
            height="360"
            preload
            autoplay
          >
            {" "}
          </video>
        )}
      </div>
      <div className="grid">
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
      </div>
    </div>
  );
};

export default Demo;
