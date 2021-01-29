import { shortTimecode } from "../timecode-converter";

/**
 *
 * `generatePreviousTimings` and `generatePreviousTimingsUpToCurrent`
 * are used to add a `previousTimings` data attribute
 * to the paragraph `TimedTextElement` in `renderElement`
 * This makes it possible to do css injection to hilight current timings
 * `.timecode[data-previous-timings*="${listOfPreviousTimingsUpToCurrentOne}"]
 *
 * where `listOfPreviousTimingsUpToCurrentOne` is dinamically generated up to the current one.
 * eg if current time is `3` then `listOfPreviousTimingsUpToCurrentOne` "0 1 2"
 */

/**
 * Generate a list of times, each rounded up to int.
 * from zero to the provided `time`.
 * eg if `time` is 6, the list would be [0, 1, 2, 3, 4, 5]
 * @param {Number} time - float, time in seconds
 */

export const generatePreviousTimings = (time) => {
  // https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
  return [...Array(parseInt(time)).keys()];
};

/**
 * splices a list of times, int, up to a certain, index current time.
 * eg  `totalTimingsInt` is [0, 1, 2, 3, 4, 5] and `time` is 3, it retusn "0 1 2"
 * then it returns
 * @param {Array} totalTimingsInt -  list of timings int, generated with `generatePreviousTimings`
 * @param {Number} time - float, time in seconds
 * @returns {String}
 */
// const generatePreviousTimingsUpToCurrent = (totalTimingsInt, time) => {
//   return totalTimingsInt.splice(0, time, 0).join(" ");
// };

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

//Take complematory circle
const offset = 360 / 8 + 15 / 8;
const generateColor = (id) => {
  const h = Math.round((id * offset) % 360);
  return `hsl(${h}, 35%, 50%)`;
};

const generatePreviousTimingsUpToCurrent = (totalTimingsInt, time) => {
  return totalTimingsInt.splice(0, time, 0).join(" ");
};

const generateTotalTimings = (words) => {
  return generatePreviousTimings(words[words.length - 1].start);
};

export const generatePreviousTimingsUpToCurrentOne = (words, start) => {
  return generatePreviousTimingsUpToCurrent(generateTotalTimings(words), start);
};

const convertDpeToSlate = (transcript) => {
  if (isEmpty(transcript)) {
    return [
      {
        speaker: "U_UKN",
        actDialog: "Pas d'acte de language",
        start: 0,
        previousTimings: "0",
        startTimecode: "00:00:00",
        type: "timedText",
        children: [
          {
            text: "Text",
            marks: [
              {
                type: "bold",
              },
            ],
          },
        ],
      },
    ];
  }

  const { words, paragraphs, acte } = transcript;

  const checkActe = (word, actes) => {
    // console.log("test Acte : ");
    const t = actes.filter(
      (acte) => acte.start <= word.start && acte.end >= word.end
    );
    // console.log(t);
    // console.log(parseInt(t[0].id, 10));
    // console.log(typeof parseInt(t[0].id, 10));
    // console.log(generateColor(parseInt(t[0].id, 10)));
    // return t.length === 1 ? generateColor(t[0].id) : "#ffff00";
    // return t.length == 1 ? "#00ff00" : "#ffff00";
    return t[0].id;
  };

  // const generateText = (paragraph, words, acte) =>
  //   words
  //     .filter(
  //       (word) => word.start >= paragraph.start && word.end <= paragraph.end
  //     )
  //     .map((w) => ({
  //       text: w.text,
  //       color: checkActe(w, acte),
  //     }));

  const generateText = (paragraph, words, actes) => {
    // const concernedActe = actes.filter(
    //   (acte) =>
    //     (paragraph.start <= acte.end && acte.end <= paragraph.end) ||
    //     (paragraph.start <= acte.start && acte.start <= paragraph.end) ||
    //     (paragraph.start => acte.start && )
    // );

    // console.log("acte");
    // console.log(concernedActe);

    const dic = words
      .filter(
        (word) => word.start >= paragraph.start && word.end <= paragraph.end
      )
      .map((w) => ({
        text: w.text,
        id: checkActe(w, acte),
      }));

    const set = new Set(dic.map(({ id }) => id));
    console.log("test cc");
    const liste = [];
    set.forEach((uniqueId) =>
      liste.push({
        text: dic
          .filter((item) => item.id == uniqueId)
          .map((w) => w.text)
          .join(" "),
        id: uniqueId,
        color: generateColor(uniqueId),
      })
    );
    // const test = dic.filter((item) => item.id == 3);
    // console.log(set);

    console.log(liste);
    return liste;
  };

  // const checkActOfDialog = (actOfDialog) => (actOfDialog ? actOfDialog : " ");

  return paragraphs.map((paragraph) => ({
    speaker: paragraph.speaker,
    // actDialog: checkActOfDialog(paragraph.actdialog),

    start: paragraph.start,
    previousTimings: generatePreviousTimingsUpToCurrent(
      generateTotalTimings(words),
      paragraph.start
    ),
    // pre-computing the display of the formatting here so that it doesn't need to convert it in leaf render
    startTimecode: shortTimecode(paragraph.start),
    type: "timedText",
    children: generateText(paragraph, words, acte),
  }));
};

export default convertDpeToSlate;
