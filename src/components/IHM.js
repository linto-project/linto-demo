import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import GraphicEqOutlinedIcon from "@material-ui/icons/GraphicEqOutlined";

import Button from "@material-ui/core/Button";

import CustomeSlider from "./CustomSlider";
import CustomSwitch from "./CustomSwitch";

import CropFree from "@material-ui/icons/CropFree";
import FolderOpenOutlined from "@material-ui/icons/FolderOpenOutlined";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import { useState } from "react";
import { Grid } from "@material-ui/core";

import { useGlobalContext } from "./Provider";

const IHM = () => {
  const { File, confDemo } = useGlobalContext();
  const { setName, getName, setReunionName, getReunionName } = File;
  const { setConf, getSetterConf, getConf } = confDemo;

  const setterConf = getSetterConf("seuilLocuteur");
  return (
    <div>
      <Accordion>
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
                  <option value="cp3">3</option>
                </NativeSelect>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
              </FormControl>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            spacing={2}
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography>Current File: {getName()}</Typography>
            </Grid>
            <Grid item>
              <Button
                style={{ width: "200px" }}
                onClick={() => setName("0-5min")}
                variant="outlined"
              >
                Ouverture
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ width: "200px" }}
                onClick={() => setName("20-25min")}
                variant="outlined"
              >
                Tour de Table
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            checked={getConf().locuteurActif}
            name="locuteurActif"
            onChange={(e) => setConf(e)}
            control={<Switch />}
            label="Locuteur actif"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <CustomeSlider
                id="Seuil-affichage"
                name="seuilLocuteur"
                disabled={!getConf().locuteurActif}
                value={getConf().seuilLocuteur}
                onChange={setterConf}
                aria-labelledby="continuous-slider"
                min={0}
                max={1}
                step={0.01}
                icon={<CropFree />}
                valueLabelDisplay="auto"
              >
                Seuil d'affichage
              </CustomeSlider>
            </Grid>
            <Grid item>
              <CustomSwitch
                disabled={!getConf().locuteurActif}
                checked={getConf().map}
                name="map"
                onChange={(e) => setConf(e)}
                icon={<ExploreIcon />}
              >
                Map
              </CustomSwitch>
            </Grid>
            <Grid item>
              <CustomSwitch
                disabled={!getConf().locuteurActif}
                checked={getConf().annotation}
                name="annotation"
                onChange={(e) => setConf(e)}
                icon={<GraphicEqOutlinedIcon />}
              >
                Annotations Timeline
              </CustomSwitch>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions2-content"
          id="additional-actions2-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox />}
            label="Option 2"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            The focus event of the nested action will propagate up and also
            focus the accordion unless you explicitly stop it.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default IHM;
