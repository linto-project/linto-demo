import React from "react";
import Grid from "@material-ui/core/Grid";

import SlateTranscriptEditor from "../dependencies/slate-transcript-editor/index.js";
import "bootstrap-css-only";
import DEMO_TRANSCRIPT_KATE from "../sample-data/KateDarling-dpe.json";

// const DEMO_MEDIA_URL_KATE =
//   "https://download.ted.com/talks/KateDarling_2018S-950k.mp4";
const DEMO_TITLE_KATE =
  "TED Talk | Kate Darling - Why we have an emotional connection to robots";

export const TranscriptReadOnly = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <SlateTranscriptEditor
          title={DEMO_TITLE_KATE}
          transcriptData={DEMO_TRANSCRIPT_KATE}
          isEditable={false}
        />
      </Grid>
    </Grid>
  );
};
