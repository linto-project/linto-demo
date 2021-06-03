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

  const spkConv = {
    spkA: 0,
    spkB: 3,
    spkC: 1,
    spkD: 2,
  };

  const [selection, setSelection] = useState([true, false, false, false]);

  const time = getTime();
  useEffect(() => {
    setSelection([false, false, false, false]);
    for (const key in getAnnot()) {
      const temp = key.split("_");
      const begin = parseFloat(temp[0]);
      const end = parseFloat(temp[1]);
      if (time > begin && time < end) {
        const spkName = Object.keys(getAnnot()[key])[0];

        let arraytempo = [false, false, false, false];
        arraytempo[spkConv[spkName]] = true;
        setSelection(arraytempo);
      }
    }

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
