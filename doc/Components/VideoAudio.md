# Provider

## Utilité

Permets de gérer la lecture de l'audio (via WaveSurfer.js) et la lecture vidéo (via un lecteur différent par Corpus).

Géres le lecteur à utiliser en fonction du corpus séléctionné.

<br>

## Lecteurs

<br>

### **Audio**

L'audio est géré par `wavesurfer.js` encapsulé en react, dans `Waveform.js`.

Gére l'état de lecture. Par exemple, lorsque l'utilisateur agit sur la timeline, déclenche un callback modifiant l'état actuel du lecteur dans le provider.

```javascript
wavesurfer.current.on("audioprocess", function() {
  setTime(wavesurfer.current.getCurrentTime());
});
```

Permets aussi d'afficher des annotations (actuellement générées aléatoirement). Voir la fonction `fakeRegion`. Elle est pensé pour un interfaçage facile avec un json.

<br>

### **Vidéo AMI**

Fichier correspondant: `VideoAmi.js`

Lecteur vidéo affichant quatre lecteurs vidéos HTML 5 natif (dans `Video4Player.js`) et une map (dans `Map.js`), pour la visualisation du corpus ami disposé en layout `Grid` de Material ui.

Prents les annotations audio, dans le cadre de la détection de locuteur actif, via le `Provider`. Les annotations sont issues de `WaveForm.js`.

```javascript
const { Annotation } = useGlobalContext();
const { getAnnot } = Annotation;
```

<br>

### **Vidéo Linto et Vidéo Gestes**

Lecteur vidéo pour le corpus Linto (`Video.js`) et le corpus Gestes (`VideoGestes.js`). Les deux sont très similaires dans leur construction.

L

**Format des annotations vidéos:**

## Utilisation

<br>

```javascript
import { useGlobalContext } from "./Provider";
```
