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
const generatePreviousTimings = (time) => {
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
const generatePreviousTimingsUpToCurrent = (totalTimingsInt, time) => {
  return totalTimingsInt.splice(0, time, 0).join(" ");
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

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
          },
        ],
      },
    ];
  }

  const { words, paragraphs } = transcript;

  const generateText = (paragraph, words) =>
    words
      .filter(
        (word) => word.start >= paragraph.start && word.end <= paragraph.end
      )
      .map((w) => w.text)
      .join(" ");

  const generateTotalTimings = (words) =>
    generatePreviousTimings(words[words.length - 1].start);

  const checkActOfDialog = (actOfDialog) => (actOfDialog ? actOfDialog : " ");

  return paragraphs.map((paragraph) => ({
    speaker: paragraph.speaker,
    actDialog: checkActOfDialog(paragraph.actdialog),

    start: paragraph.start,
    previousTimings: generatePreviousTimingsUpToCurrent(
      generateTotalTimings(words),
      paragraph.start
    ),
    // pre-computing the display of the formatting here so that it doesn't need to convert it in leaf render
    startTimecode: shortTimecode(paragraph.start),
    type: "timedText",
    children: [{ text: generateText(paragraph, words) }],
  }));
};

export default convertDpeToSlate;
