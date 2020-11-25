import { useState, useEffect } from "react";
import Button from "../components/Button";
import "./Demo.css";

import video1 from "./../video/Is1002b.Closeup1-1.webm";
import video2 from "./../video/Is1002b.Closeup2-2.webm";
import video3 from "./../video/Is1002b.Closeup3-3.webm";
import video4 from "./../video/Is1002b.Closeup4-4.webm";

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
          <video src={video1} width="640" height="360" preload autoplay>
            {" "}
          </video>
        )}
        {!isButtonSelected("video") && isButtonSelected("audio") && (
          // eslint-disable-next-line
          <video width="100%" controls autoplay muted>
            <source src={video2} type="videos/mp4"></source>
          </video>
        )}
        {isButtonSelected("video") && !isButtonSelected("audio") && (
          // eslint-disable-next-line
          <video width="100%" controls autoplay muted>
            <source src={video3} type="videos/mp4"></source>
          </video>
        )}
        {isButtonSelected("video") && isButtonSelected("audio") && (
          // eslint-disable-next-line
          <video width="100%" controls autoplay muted>
            <source src={video4} type="videos/mp4"></source>
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
