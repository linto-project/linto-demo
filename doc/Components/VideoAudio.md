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

Un lecteur vidéo html 5 est joue la vidéo en étant `hidden` (caché).

La frame de la vidéo est prise et copier sur un canva. Le numéro de frame courante est calculé via la position (en seconde) du lecteur vidéo \* le nombre de fps de la vidéo.

Les rectangles associées au bounding box des Json (importés via un lazy import, pour ne pas prendre trop de bande passante à la connexion sur le site) sont dessinées.

**Format des annotations vidéos:**

```
{
    "0": [
        {
            "x": 380,
            "y": 309,
            "width": 37,
            "height": 73,
            "points": [
                [
                    380,
                    309
                ],
                [
                    380,
                    346
                ],
                [
                    453,
                    309
                ],
                [
                    453,
                    346
                ]
            ],
            "center": [
                416.5,
                327.5
            ],
            "label": 4,
            "score": 0.7860917448997498
        },
        {
            "x": 529,
            "y": 288,
            "width": 148,
            "height": 155,
            "points": [
                [
                    529,
                    288
                ],
                [
                    529,
                    436
                ],
                [
                    684,
                    288
                ],
                [
                    684,
                    436
                ]
            ],
            "center": [
                606.5,
                362.0
            ],
            "label": 2,
            "score": 0.9799479246139526
        }
    ],
    "1": [
        ...
    ]
}

```

<br>

## Utilisation

```javascript

// Lecteur audio en fonction du corpus

import { useGlobalContext } from "./Provider";
const { File } = useGlobalContext();

{File.getReunionName() === "Linto" && (
    ...
)}

```
