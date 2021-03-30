# Provider

## Utilité

Composant modifié issue de [Slate Js](https://github.com/pietrop/slate-transcript-editor).

Composant dans `Transcript.js`, qui utilise un la librairie modifiée dans `dependencies` .

Permets l'affichage des transcripts et actes de dialogues dans le transcript.

Synchronisé avec wavesurfer.

## Script pour générer les fichiers json à utiliser (python):

```python
listeWords = []
listParagraphs = []
listAct = []

#Change in function of first line of aligned_sorted
file_aligned_sorted= 'text_R1_align_sorted_wo_overlap.txt'
file_acte_language = 'rap1_actes_dialogues.txt'
file_out = file_acte_language.replace(".txt","_converted.json" )


#end in s
begin = 6*60
endMax = 16*60

with open(file_aligned_sorted, 'r', encoding="utf-8") as fd:
    test = fd.readline()
    splitLine = test.split(" ")
    print(test)
    print(splitLine)
    precedentName = splitLine[4].rstrip("\n")
    precedentStartTime = float(splitLine[1])
    precedentEndTime = float(splitLine[2])
    #Note : Modify these line if begin != 0
    #precedentName = "Abdel"
    #precedentStartTime =  360.43
    #precedentEndTime =  360.72

countParagraph = 0
acteDialogue= True

import json

with open(file_aligned_sorted, 'r', encoding="utf-8") as fd:
    for cnt, line in enumerate(fd):
        #print("Line {}: {}".format(cnt, line))
        splitLine = line.split(" ")
        #print(splitLine)
        word = {}
        paragraph = {}
        if(len(splitLine) > 1):
            if(float(splitLine[1]) > begin and float(splitLine[1]) < endMax):
                word["id"] = cnt
                word["start"] = float(splitLine[1]) - begin
                word["end"] = float(splitLine[2]) - begin
                word["text"] = splitLine[3]
                listeWords.append(word)

                #paragraph
                if(precedentName != splitLine[4].rstrip("\n")):
                    paragraph["id"] = countParagraph
                    paragraph["start"] = float(precedentStartTime) - begin
                    paragraph["end"] = float(precedentEndTime) - begin
                    paragraph["speaker"] = precedentName
                    listParagraphs.append(paragraph)

                    precedentStartTime = splitLine[1]
                    precedentEndTime = splitLine[2]
                    precedentName = splitLine[4].rstrip("\n")
                    countParagraph += 1
                else:
                    precedentEndTime = splitLine[2]

if(acteDialogue):
    countDialogue = 0
    with open(file_acte_language, 'r', encoding="utf-8") as fa:
        for cnt, line in enumerate(fa):
            splitLine = line.split(" ")
            if(len(splitLine) > 1):
                if(float(splitLine[1]) < endMax):
                    acte = {}
                    acte["start"] = float(splitLine[1]) - begin
                    acte["end"] = float(splitLine[2]) - begin
                    acte["type"] = splitLine[3]
                    acte["id"] = countDialogue
                    listAct.append(acte)
                    countDialogue += 1

dic =  {}
dic["words"] = listeWords
dic["paragraphs"] = listParagraphs
dic["acte"] = listAct

with open(file_out, "w", encoding="utf-8") as outfile:
    json.dump(dic, outfile, indent = 2)


```

Exemples de fichiers en entrée:

- [ Texte ](./R1_aligned.txt)
- [ Actes ](./R1_acte.txt)

<br>

## Utilisation

<br>

```javascript
import { useGlobalContext } from "./Provider";
```
