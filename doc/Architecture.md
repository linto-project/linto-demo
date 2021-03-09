# Architecture

## Architecture générale

![Architecture 1 ](images/architecture_1.png)

Le Visualisateur est composé de 3 composants qui intéragissent entre eux pour permettre à l'utilisateur de sélectionner ce qu'il veut voir ou non.

Un composant, non-visible, nommé `Provider`, permets de faire le lien logique entre les différents composants.

<br>

- ![#96c081](https://via.placeholder.com/15/96c081/000000?text=+) IHM

Permets de modifier les paramètres générales du visualisateur, et ce qui est visible ou non.

<br>

- ![#6c8ebf](https://via.placeholder.com/15/6c8ebf/000000?text=+) Lecteur audio-vidéo

Permets d'afficher une vidéo et de lire une audio.
Le lecteur audio et vidéo sont enrichies d'informations.

Permets aussi à l'utilisateur d'ajuster le volume, l'emplacement dans la lecture, l'état (lecture/pause).

<br>

- ![#b85450](https://via.placeholder.com/15/b85450/000000?text=+) Zone d'affichage supplémentaire

Composant à affichage optionnel permettant de visualiser d'autres informations.

Dans notre cas, ce composant est uniquement utilisé dans le cadre du transcript (enrichie via acte de language) du corpus Linto.

<br>

Davantages de détails sur les composants ici: [Composants](./Composants.md)

## Technologies utilisées

- React
- Node
- npm (gestionnaire de paquet)

<br>

## Librairies utilisées

- [Wavesurfer.js](https://wavesurfer-js.org/)

Librairie pour la lecture audio et l'affichage de l'amplitude audio.
Gère aussi l'emplacement de la lecture vidéo via la timeline (composant "" master "" de lecture).

- [Material ui](https://material-ui.com/)

Librairie permmettant d'avoir des composants pour l'IHM et pour le côté responsive.

- [Slate transcript editor](https://github.com/pietrop/slate-transcript-editor)

Librairie pour l'affichage du transcript et des actes de dialogue.
Attention: Version modifiée, présente dans `src/dependencies/slate-transcript-editor` utilisée pour l'affichage de l'act de dialogue
