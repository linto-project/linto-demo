# IHM

## Utilité

Permets de changer les paramètres du démonstrateur sur ce qui est à visualiser.

Utilise material ui et de nombreux composants développer spécifiquement pour le simulateur (`CustomSlider`, `CustomSwitch`, `CustomSelect`). Utilise aussi les icons issues de material ui.

Utilise un layout Grid de Material ui.

<br>

## Utilisation

<br>

```javascript

// Afficher un composant en fonction d'un corpus

const { File, confDemo } = useGlobalContext();

{File.getReunionName() !== "AMI" && (
  ...
)}


// Rajouter un Accordéon
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

<Accordion defaultExpanded={true}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        ...
    </AccordionSummary>
    <AccordionDetails>
        ...
    </AccordionDetails>
</Accordion>


// Rajouter un slider
// (Même principe pour un Switch ou Select)

import CropFree from "@material-ui/icons/CropFree";

const { confDemo } = useGlobalContext();
const { setConf, getSetterConf, getConf } = confDemo;

<CustomeSlider
    id="id"
    name="seuilLocuteur"
    // Disabled permets de désactiver le slider
    disabled={!getConf().locuteurActif}
    // Valeur à prendre du provider
    value={getConf().seuilLocuteur}
    // Setter du provider
    // Attention: prendre le même nom après le "." (ici  "seuilLocuteur" ) et être certain que la clé de dico soit présent dans le provider
    onChange={getSetterConf("seuilLocuteur");}
    min={0}
    max={1}
    step={0.01}
    //
    icon={<CropFree color={colorIconsSP2} />}
    valueLabelDisplay="auto"
>
    Seuil de confiance
</CustomeSlider>



```
