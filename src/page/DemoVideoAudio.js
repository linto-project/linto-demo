import "./Demo.css";

import { ContextProvider } from "../components/Provider";
import VideoAudio from "../components/VideoAudio";
import IHM from "../components/IHM";
import { Grid } from "@material-ui/core";

const DemoVideoAudio = () => {
  return (
    <div className="demo">
      <ContextProvider>
        <Grid container>
          <Grid item xs={2}>
            <IHM />
          </Grid>
          <Grid item xs={10}>
            <VideoAudio framerate={10} />
          </Grid>
        </Grid>
      </ContextProvider>
    </div>
  );
};

export default DemoVideoAudio;
