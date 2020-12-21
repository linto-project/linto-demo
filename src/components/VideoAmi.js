import Grid from "@material-ui/core/Grid";
import Video4Player from "./Video4Player";
import "./Video.css";
import Map from "./Map";
import { useGlobalContext } from "./Provider";
// import data from "../data/detect_meeting_RAP_1_b.json";

const VideoAMI = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  const { File, confDemo } = useGlobalContext();
  const { setName, getName, setReunionName, getReunionName } = File;
  const { setConf, getConf } = confDemo;

  const returnMap = (
    <Grid item>
      <Map />
    </Grid>
  );

  return (
    <div>
      <Grid container spacing={0} justify="space-around" alignItems="center">
        <Grid item>
          <Video4Player
            url={url}
            isPlaying={isPlaying}
            durationSec={durationSec}
            setVideoLoaded={setVideoLoaded}
          />
        </Grid>
        {getConf().map && getConf().locuteurActif ? returnMap : ""}
      </Grid>
    </div>
  );
};

export default VideoAMI;
