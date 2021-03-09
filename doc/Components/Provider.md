# Provider

## Utilité

Permets de stocker l'état général de la démo et de la communiquer entre les différents composants

<br>

### Etat stocké:

- File: Corpus et fichier actuellement séléctionné
- confDemo: Configuration du visualisateur en terme d'affichage

- Player: Configuration des lecteurs (en terme d'emplacement dans la timeline et play/pause)

  **Attention** : Le `useState` du `play/pause` et du `time` sont dissociées: quand ils étaient ensemble dans un même dictionnaire d'état, comme les autres éléments de configuration, l'accès à l'un activait les hooks des deux. Ils sont donc dissociés car **_critique_**.

- Annotation: Permets de stocker un json (dans le cadre du corpus ami, les annotations générées actuellement aléatoirement)

<br>

## Utilisation

<br>

```javascript
import { useGlobalContext } from "./Provider";

(...)


const { File, confDemo } = useGlobalContext();
const { setName, setReunionName, getReunionName } = File;
const { setConf, getSetterConf, getConf } = confDemo;

// Getter:

const setterConf = getSetterConf("seuilLocuteur");
const locuteurActif =  getConf().locuteurActif

// Setter

// e.target.value vient d'un évenvement js (type clique sur l'ihm)
getSetterConf("typeAnnotationDialogue")(e.target.value);
```
