import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Video4Player from "./Video4Player";
import "./Video.css";
import Map from "./Map";
import { useGlobalContext } from "./Provider";
// import data from "../data/detect_meeting_RAP_1_b.json";

const VideoAMI = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  const { confDemo, Annotation, Player } = useGlobalContext();
  const { getAnnot } = Annotation;
  const { getTime } = Player;
  const { getConf } = confDemo;

  const [selection, setSelection] = useState([true, false, false, false]);

  const valueLocuteur = getConf().seuilLocuteur;
  const checkElement = (e) => {
    if (time > e.start && time < e.end && e.label < 4) {
      console.log(
        "time : " + time + ", start : " + e.start + ", end : " + e.end
      );

      if (e.confidence > valueLocuteur) {
        let arraytempo = [false, false, false, false];
        arraytempo[e.label] = true;
        setSelection([...arraytempo]);
      }
    }
  };

  const time = getTime();
  useEffect(() => {
    setSelection([false, false, false, false]);
    getAnnot().map((e) => checkElement(e));

    // eslint-disable-next-line
  }, [time]);

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
