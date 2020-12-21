import Grid from "@material-ui/core/Grid";
import Video4Player from "./Video4Player";
import "./Video.css";
// import data from "../data/detect_meeting_RAP_1_b.json";

const VideoAMI = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  return (
    <div>
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item>
          <Video4Player
            url={url}
            isPlaying={isPlaying}
            durationSec={durationSec}
            setVideoLoaded={setVideoLoaded}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoAMI;
