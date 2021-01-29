import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import SlateTranscriptEditor from "../dependencies/slate-transcript-editor/index.js";
import "bootstrap-css-only";
// import DEMO_TRANSCRIPT_KATE from "../sample-data/KateDarling-dpe.json";
import ML from "../sample-data/converted.json";
// import ML from "../sample-data/KateDarling-dpe.json";
import VT from "../sample-data/KateDarling-dpe2.json";
import { useGlobalContext } from "./Provider";
// const DEMO_MEDIA_URL_KATE =
//   "https://download.ted.com/talks/KateDarling_2018S-950k.mp4";
const DEMO_TITLE_KATE =
  "TED Talk | Kate Darling - Why we have an emotional connection to robots";

export const TranscriptReadOnly = () => {
  const { confDemo } = useGlobalContext();
  const [state, setState] = useState(0);

  const transcript = confDemo.getConf().transcript;
  const typeAnnot = confDemo.getConf().typeAnnotationDialogue;
  const actLanguage = confDemo.getConf().actLanguage;

  useEffect(() => {
    //Dummy to force reload
    setState((state) => state + 1);
  }, [setState, typeAnnot, actLanguage]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const getTranscriptData = (boolvar) => {
    return boolvar ? ML : VT;
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        {transcript && (
          <SlateTranscriptEditor
            key={state}
            title={DEMO_TITLE_KATE}
            transcriptData={getTranscriptData(
              confDemo.getConf().typeAnnotationDialogue === "ML"
            )}
            isEditable={false}
          />
        )}
      </Grid>
    </Grid>
  );
};
