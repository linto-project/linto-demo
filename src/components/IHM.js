import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

import CustomeSlider from "./CustomSlider";

import CropFree from "@material-ui/icons/CropFree";
import FolderOpenOutlined from "@material-ui/icons/FolderOpenOutlined";

import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import { useGlobalContext } from "./Provider";

const IHM = () => {
  const [checkLocuteurActif, setCheckLocuteurActif] = useState(false);
  const [seuilLocuteurActif, setSeuilLocuteurActif] = useState(0.5);

  const { File } = useGlobalContext();
  const { setName } = File;

  useEffect(() => {
    console.log(seuilLocuteurActif);
  }, [seuilLocuteurActif]);

  return (
    <div style={{ width: "100%" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid spacing={2} container>
            <Grid item>
              <FolderOpenOutlined />
            </Grid>
            <Grid item>
              <Typography>Chargement</Typography>
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
            {/* <Grid item>
              <Button
                style={{ width: "200px" }}
                onClick={() => setName("Default")}
                variant="outlined"
              >
                Default
              </Button>
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            checked={checkLocuteurActif}
            onChange={(e) => setCheckLocuteurActif(!checkLocuteurActif)}
            control={<Switch />}
            label="Locuteur actif"
          />
        </AccordionSummary>
        <AccordionDetails>
          <CustomeSlider
            id="Seuil-affichage"
            name="Seuil-affichage"
            disabled={!checkLocuteurActif}
            value={seuilLocuteurActif}
            onChange={setSeuilLocuteurActif}
            aria-labelledby="continuous-slider"
            min={0}
            max={1}
            step={0.01}
            icon={<CropFree />}
            valueLabelDisplay="auto"
          >
            Seuil d'affichage
          </CustomeSlider>
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
