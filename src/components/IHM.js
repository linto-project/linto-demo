import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import GraphicEqOutlinedIcon from "@material-ui/icons/GraphicEqOutlined";
import PersonOutlineIcon from "@material-ui/icons/RecentActorsOutlined";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOverOutlined";

import Button from "./Button";

import CustomeSlider from "./CustomSlider";
import CustomSwitch from "./CustomSwitch";
import CustomSelect from "./CustomSelect";

import CropFree from "@material-ui/icons/CropFree";
import FolderOpenOutlined from "@material-ui/icons/FolderOpenOutlined";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { Grid } from "@material-ui/core";

import { useGlobalContext } from "./Provider";

// import { useEffect, useState } from "react";

import "./IHM.css";

const IHM = () => {
  const { File, confDemo } = useGlobalContext();
  const { setName, setReunionName, getReunionName } = File;
  const { setConf, getSetterConf, getConf } = confDemo;

  // const [state, setState] = useState(0);

  const setterConf = getSetterConf("seuilLocuteur");

  const colorIconsSP2 = getConf().locuteurActif ? "action" : "disabled";
  const colorIconsSP5 = getConf().transcript ? "action" : "disabled";

  const nameVolet = () => {
    if (File.getReunionName() === "AMI") {
      return "Locuteur actif";
    }
    if (File.getReunionName() === "Linto") {
      return "Signature audio-vidéo";
    }
    if (File.getReunionName() === "Gestes") {
      return "Reconnaissance de gestes";
    }
  };

  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid spacing={3} alignItems="center" container>
            <Grid item>
              <FolderOpenOutlined />
            </Grid>
            <Grid style={{ width: "70%" }} item>
              <FormControl
                style={{ width: "65%" }}
                onChange={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <InputLabel shrink>Corpus</InputLabel>
                <NativeSelect
                  value={getReunionName()}
                  onChange={(e) => {
                    setReunionName(e.target.value);
                  }}
                >
                  <option value="AMI">AMI</option>
                  <option value="Linto">Linto</option>
                  <option value="Gestes">Gestes</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionSummary>
        {/* AMI tempo for demo */
        File.getReunionName() === "TEMPO" && (
          <AccordionDetails>
            <Grid
              spacing={2}
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Button
                  style={{ width: "200px" }}
                  onClick={() => setName("0-5min")}
                  selected={File.getName() === "0-5min"}
                  IHM={true}
                  variant="outlined"
                >
                  Ouverture
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ width: "200px" }}
                  onClick={() => setName("20-25min")}
                  selected={File.getName() === "20-25min"}
                  IHM={true}
                  variant="outlined"
                >
                  Tour de Table
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        )}
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            checked={getConf().locuteurActif}
            name="locuteurActif"
            onChange={(e) => setConf(e)}
            control={<Switch color="primary" />}
            label={nameVolet()}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={2}>
            {File.getReunionName() !== "AMI" && (
              <Grid item>
                <CustomSelect
                  icon={<PersonOutlineIcon color={colorIconsSP2} />}
                  disabled={!getConf().locuteurActif}
                  value={getConf().typeAnnotationLocuteur}
                  onChange={(e) => {
                    getSetterConf("typeAnnotationLocuteur")(e.target.value);
                  }}
                  id="Type d'annotatione"
                  name="typeAnnotationLocuteur"
                  // aria-labelledby="select"
                  title={"Type d'annotations"}
                >
                  <option value="ML">Machine Learning</option>
                  <option value="VT">Vérité Terrain</option>
                  <option value="MLVT">Les deux</option>
                </CustomSelect>
              </Grid>
            )}

            {File.getReunionName() !== "Gestes" && (
              <Grid item>
                <CustomeSlider
                  id="Seuil-affichage"
                  name="seuilLocuteur"
                  disabled={!getConf().locuteurActif}
                  value={getConf().seuilLocuteur}
                  onChange={setterConf}
                  // aria-labelledby="continuous-slider"
                  min={0}
                  max={1}
                  step={0.01}
                  icon={<CropFree color={colorIconsSP2} />}
                  valueLabelDisplay="auto"
                >
                  Seuil de confiance
                </CustomeSlider>
              </Grid>
            )}
            {File.getReunionName() === "AMI" && (
              <Grid item>
                <CustomSwitch
                  disabled={!getConf().locuteurActif}
                  checked={getConf().map}
                  name="map"
                  onChange={(e) => setConf(e)}
                  icon={<ExploreIcon color={colorIconsSP2} />}
                >
                  Map
                </CustomSwitch>
              </Grid>
            )}
            {File.getReunionName() !== "Gestes" && (
              <Grid item>
                <CustomSwitch
                  disabled={!getConf().locuteurActif}
                  checked={getConf().annotation}
                  name="annotation"
                  onChange={(e) => setConf(e)}
                  icon={<GraphicEqOutlinedIcon color={colorIconsSP2} />}
                >
                  Annotations Timeline
                </CustomSwitch>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {File.getReunionName() === "Linto" && (
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FormControlLabel
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              checked={getConf().transcript}
              name="transcript"
              onChange={(e) => setConf(e)}
              control={<Switch color="primary" />}
              label="Transcription"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <CustomSelect
                  icon={<PersonOutlineIcon color={colorIconsSP5} />}
                  disabled={!getConf().transcript}
                  value={getConf().typeannotation}
                  onChange={(e) => {
                    getSetterConf("typeAnnotationDialogue")(e.target.value);
                  }}
                  id="Type d'annotatione"
                  name="typeAnnotationDialogue"
                  // aria-labelledby="select"
                  title={"Type d'annotations"}
                >
                  <option value="ML">Machine Learning</option>
                  <option value="VT">Vérité Terrain</option>
                </CustomSelect>
              </Grid>
              <Grid item>
                <CustomSwitch
                  disabled={!getConf().transcript}
                  checked={getConf().actLanguage}
                  name="actLanguage"
                  onChange={(e) => setConf(e)}
                  icon={<RecordVoiceOverIcon color={colorIconsSP5} />}
                >
                  Actes de language
                </CustomSwitch>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default IHM;
