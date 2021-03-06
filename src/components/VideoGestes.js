import { useEffect, useState, useRef } from "react";
import "./Video.css";

import colors from "../data/colorsGestes";
import { useGlobalContext } from "./Provider";

const Video = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  const videoRef = useRef(null);
  const [state, setState] = useState(0);

  const [dataML, setDataML] = useState([]);
  const [dataVT, setDataVT] = useState([]);

  const { confDemo } = useGlobalContext();

  useEffect(() => {
    videoRef.current.currentTime = durationSec;
  }, [durationSec]);

  useEffect(() => {
    isPlaying ? videoRef.current.play() : videoRef.current.pause();
  }, [isPlaying]);

  const videoReady = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    //Dummy to force reload
    setState((state) => state + 1);

    const importJson = async () => {
      const dataML = await import("../data/gestes/detections.json");
      // const dataML = await import("../data/detections.json");
      const dataVT = await import("../data/gestes/detections_vt.json");
      // const dataVT = await import("../data/detections.json");
      setDataML(dataML);
      setDataVT(dataVT);
    };

    importJson();
  }, [url, setDataML, setDataVT, setState]);

  // https://www.robinwieruch.de/react-function-component

  const canva = useRef(null);
  const fpsVideo = 10;
  const fpsAct = 50;
  const width = 1280;
  const height = 640;

  const drawImage = () => {
    canva.current
      .getContext("2d", { alpha: false })
      .drawImage(videoRef.current, 0, 0, width, height);
  };

  const typeAnnot = confDemo.getConf().typeAnnotationLocuteur;
  const locuteurActif = confDemo.getConf().locuteurActif;

  useEffect(() => {
    const drawRectangleML = (x, y, w, h, label, typeAnnot, score) => {
      canva.current.getContext("2d", { alpha: false }).lineWidth = 2;
      if (typeAnnot === "MLVT") {
        canva.current.getContext("2d", { alpha: false }).strokeStyle = "red";
        canva.current.getContext("2d", { alpha: false }).fillStyle = "red";
        canva.current.getContext("2d", { alpha: false }).setLineDash([5, 5]);
      } else {
        canva.current.getContext("2d", { alpha: false }).strokeStyle =
          colors[label];
        canva.current.getContext("2d", { alpha: false }).fillStyle =
          colors[label];
        canva.current.getContext("2d", { alpha: false }).setLineDash([]);
      }
      canva.current.getContext("2d", { alpha: false }).strokeRect(x, y, w, h);
      if (label !== "Person") {
        canva.current.getContext("2d", { alpha: false }).font = "20px Arial";
        if (typeAnnot !== "MLVT")
          canva.current
            .getContext("2d", { alpha: 0.5 })
            .fillText(label + ": " + score.toString(), x + w + 10, y);
        else {
          canva.current
            .getContext("2d", { alpha: 0.5 })
            .fillText(label + ": " + score.toString(), x + w + 10, y + h);
        }
      }
    };

    const drawRectangleCorrected = (x, y, w, h, label, typeAnnot) => {
      canva.current.getContext("2d", { alpha: false }).lineWidth = 2;
      if (typeAnnot === "MLVT") {
        canva.current.getContext("2d", { alpha: false }).strokeStyle = "green";
        canva.current.getContext("2d", { alpha: false }).fillStyle = "green";
        canva.current
          .getContext("2d", { alpha: false })
          .setLineDash([0, 5, 5, 0]);
      } else {
        canva.current.getContext("2d", { alpha: false }).strokeStyle =
          colors[label];
        canva.current.getContext("2d", { alpha: false }).fillStyle =
          colors[label];
        canva.current.getContext("2d", { alpha: false }).setLineDash([]);
      }

      if (label !== "Person") {
        canva.current.getContext("2d", { alpha: false }).font = "20px Arial";
        canva.current
          .getContext("2d", { alpha: 0.5 })
          .fillText(label, x + w + 10, y);
      }
      canva.current.getContext("2d", { alpha: false }).strokeRect(x, y, w, h);
    };

    const interval = setInterval(() => {
      drawImage();
      // Offset RAP 1
      const offset = 0;
      const frame =
        Math.round(videoRef.current.currentTime * fpsVideo) + offset;
      // drawFPS(videoRef.current.currentTime);

      if (frame < 366 && locuteurActif) {
        if (typeAnnot === "ML" || typeAnnot === "MLVT") {
          dataML[frame].map((o) =>
            drawRectangleML(
              o.x,
              o.y,
              o.width,
              o.height,
              o.label,
              typeAnnot,
              o.score
            )
          );
        }
        if (typeAnnot === "VT" || typeAnnot === "MLVT") {
          dataVT[frame].map((o) =>
            drawRectangleCorrected(
              o.x,
              o.y,
              o.width,
              o.height,
              o.label,
              typeAnnot
            )
          );
        }
      }
    }, 1000 / fpsAct);
    return () => clearInterval(interval);
  }, [typeAnnot, locuteurActif, dataML, dataVT]);

  return (
    <div className="video" key={state}>
      <canvas
        style={{ zindex: "0" }}
        ref={canva}
        width="1280"
        height="640"
      ></canvas>
      <video
        key={url}
        preload={"true"}
        ref={videoRef}
        width="1280"
        height="640"
        onCanPlayThrough={videoReady}
        hidden
      >
        <source src={url} />
      </video>
    </div>
  );
};

export default Video;
