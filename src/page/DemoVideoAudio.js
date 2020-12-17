import "./Demo.css";

import { ContextProvider } from "../components/Provider";
import VideoAudio from "../components/VideoAudio";
import IHM from "../components/IHM";
import { Grid } from "@material-ui/core";

// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

const DemoVideoAudio = () => {
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div className="demo">
      <ContextProvider>
        <Grid container>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <IHM />
          </Grid>
          <Grid item xs={6} sm={8} md={9} lg={10}>
            <VideoAudio framerate={10} />
          </Grid>
        </Grid>
      </ContextProvider>
    </div>
  );
};

export default DemoVideoAudio;
