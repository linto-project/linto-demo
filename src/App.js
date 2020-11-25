import { useState, useEffect } from "react";
import Button from "./components/Button";
import "./App.css";

import imageVideo from "./images/video.png";
import imageAudioVideo from "./images/audiovideo.png";
import imageAudio from "./images/audio.png";
import imageNormal from "./images/normal.png";

const App = () => {
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
    <div className="app">
      <div classname="grid">
        {!isButtonSelected("video") && !isButtonSelected("audio") && (
          // eslint-disable-next-line
          <img src={imageNormal} width="800" height="665" />
        )}
        {!isButtonSelected("video") && isButtonSelected("audio") && (
          // eslint-disable-next-line
          <img src={imageAudio} width="800" height="665" />
        )}
        {isButtonSelected("video") && !isButtonSelected("audio") && (
          // eslint-disable-next-line
          <img src={imageVideo} width="800" height="665" />
        )}
        {isButtonSelected("video") && isButtonSelected("audio") && (
          // eslint-disable-next-line
          <img src={imageAudioVideo} width="800" height="665" />
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

export default App;
