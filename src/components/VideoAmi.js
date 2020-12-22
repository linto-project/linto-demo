import Grid from "@material-ui/core/Grid";
import { useEffect, useState, useRef } from "react";
import Video4Player from "./Video4Player";
import "./Video.css";
import Map from "./Map";
import { useGlobalContext } from "./Provider";
// import data from "../data/detect_meeting_RAP_1_b.json";

const VideoAMI = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  const { File, confDemo } = useGlobalContext();
  const { setName, getName, setReunionName, getReunionName } = File;
  const { getConf } = confDemo;

  const [selection, setSelection] = useState([true, false, false, false]);
  const [cpt, setCpt] = useState(0);

  const doCos = () => {
    let test = [];
    const loc = getConf().seuilLocuteur;
    Math.cos(cpt + 0 * 1.57) > loc ? test.push(true) : test.push(false);
    Math.cos(cpt + 1 * 1.57) > loc ? test.push(true) : test.push(false);
    Math.cos(cpt + 2 * 1.57) > loc ? test.push(true) : test.push(false);
    Math.cos(cpt + 3 * 1.57) > loc ? test.push(true) : test.push(false);
    setSelection(test);
    // console.log("selection : " + selection);
    // console.log("cpt : " + cpt);
    // console.log("Math.cos : " + Math.cos(cpt));
    // console.log("seuil : " + loc);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCpt(cpt - 0.1);
      doCos();
    }, 200);
    return () => clearInterval(interval);
  }, [cpt]);

  const returnMap = (
    <Grid item>
      <Map selection={selection} />
    </Grid>
  );

  const activeSelection = getConf().locuteurActif
    ? selection
    : [false, false, false, false];

  return (
    <div>
      <Grid container spacing={0} justify="space-around" alignItems="center">
        <Grid item>
          <Video4Player
            url={url}
            isPlaying={isPlaying}
            durationSec={durationSec}
            setVideoLoaded={setVideoLoaded}
            selection={activeSelection}
          />
        </Grid>
        {getConf().map && getConf().locuteurActif ? returnMap : ""}
      </Grid>
    </div>
  );
};

export default VideoAMI;
