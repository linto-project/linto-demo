import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import convertDpeToSlate from "../util/dpe-to-slate";
import { useGlobalContext } from "../../../components/Provider";

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default function SlateTranscriptEditor(props) {
  const { Player, confDemo } = useGlobalContext();
  const { getTime } = Player;

  const actLanguage = confDemo.getConf().actLanguage;

  const timeTemp = getTime();
  useEffect(() => {
    // Add little offset to componsate react hook delay
    const test = getTime();
    handleTimeUpdated(test + 1);
    // eslint-disable-next-line
  }, [timeTemp]);

  const [currentTime, setCurrentTime] = useState(0);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [value, setValue] = useState([]);
  const defaultShowSpeakersPreference =
    typeof props.showSpeakers === "boolean" ? props.showSpeakers : true;
  const defaultShowTimecodesPreference =
    typeof props.showTimecodes === "boolean" ? props.showTimecodes : true;

  const [showSpeakers] = useState(defaultShowSpeakersPreference);
  const [showTimecodes] = useState(defaultShowTimecodesPreference);

  useEffect(() => {
    if (props.transcriptData) {
      const res = convertDpeToSlate(props.transcriptData);
      setValue(res);
    }
    // eslint-disable-next-line
  }, []);

  const handleTimeUpdated = (time) => {
    setCurrentTime(time);
    // TODO: setting duration here as a workaround
    // setDuration(mediaRef.current.duration);
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "timedText":
        return <TimedTextElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = ({ attributes, children, leaf }) => {
    // let text = " " + leaf.text;
    let text = leaf.text;
    if (!leaf.text[0] !== "'") {
      text += " ";
    }

    const couleur = actLanguage ? leaf.color : "#6c757d";
    return <span style={{ color: couleur }}>{text}</span>;
  };

  const TimedTextElement = useCallback(
    (props) => {
      const textLg = 6;
      const textXl = 7;
      return (
        <Row {...props.attributes}>
          {showTimecodes && (
            <Col
              contentEditable={false}
              // xs={3}
              sm={2}
              md={4}
              lg={3}
              xl={2}
              className={"p-t-2 text-truncate"}
            >
              <code
                contentEditable={false}
                style={{ cursor: "pointer" }}
                className={"timecode text-muted unselectable"}
                // onClick={handleTimedTextClick}
                title={props.element.startTimecode}
                data-start={props.element.start}
              >
                {props.element.startTimecode}
              </code>
            </Col>
          )}
          {showSpeakers && (
            <Col
              contentEditable={false}
              // xs={3}
              sm={10}
              md={8}
              lg={3}
              xl={3}
              className={"p-t-2 text-truncate"}
            >
              <span
                contentEditable={false}
                className={"text-truncate text-muted unselectable"}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  textTransform: "uppercase",
                }}
                // title={props.element.speaker.toUpperCase()}
                title={props.element.speaker}
                // onClick={handleSetSpeakerName.bind(this, props.element)}
              >
                {" "}
                {props.element.speaker}
              </span>
            </Col>
          )}

          <Col
            xs={12}
            sm={12}
            md={12}
            lg={textLg}
            xl={textXl}
            className={"p-t-2 mx-auto"}
          >
            <Row>
              {/* <Col xs={!actLanguage ? 12 : 9}> */}
              <Col xs={12}>
                <span
                  className={"timecode text"}
                  data-start={props.element.start}
                  data-previous-timings={props.element.previousTimings}
                  title={props.element.start}
                >
                  {props.children}
                </span>
              </Col>
              {/* {actLanguage && <Col xs={3}> </Col>} */}
            </Row>
          </Col>
        </Row>
      );
    },
    // eslint-disable-next-line
    [actLanguage, showTimecodes, showSpeakers]
  );

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  // const handleTimedTextClick = (e) => {
  //   if (e.target.classList.contains("timecode")) {
  //     // eslint-disable-next-line
  //     const start = e.target.dataset.start;
  //     // if (mediaRef && mediaRef.current) {
  //     //   mediaRef.current.currentTime = parseInt(start);
  //     //   mediaRef.current.play();
  //     // }
  //   } else if (e.target.dataset.slateString) {
  //     if (e.target.parentNode.dataset.start) {
  //       // eslint-disable-next-line
  //       const start = e.target.parentNode.dataset.start;
  //       // if (mediaRef && mediaRef.current && start) {
  //       //   mediaRef.current.currentTime = parseInt(start);
  //       //   mediaRef.current.play();
  //       // }
  //     }
  //   }
  // };

  /**
   * See explanation in `src/utils/dpe-to-slate/index.js` for how this function works with css injection
   * to provide current paragaph's highlight.
   * @param {Number} currentTime - float in seconds
   */
  const generatePreviousTimingsUpToCurrent = (currentTime) => {
    // edge case - empty transcription
    if (isEmpty(props.transcriptData)) {
      return "";
    }
    const lastWordStartTime =
      props.transcriptData.words[props.transcriptData.words.length - 1].start;
    const lastWordStartTimeInt = parseInt(lastWordStartTime);
    const emptyListOfTimes = Array(lastWordStartTimeInt);
    const listOfTimesInt = [...emptyListOfTimes.keys()];
    const listOfTimesUpToCurrentTimeInt = listOfTimesInt.splice(
      0,
      currentTime,
      0
    );
    const stringlistOfTimesUpToCurrentTimeInt = listOfTimesUpToCurrentTimeInt.join(
      " "
    );
    return stringlistOfTimesUpToCurrentTimeInt;
  };

  return (
    <Container
      style={{
        backgroundColor: "#fff",
        paddingTop: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        border: "none",
      }}
    >
      {/* <style scoped>
        {`
              .timecode[data-previous-timings*="${mediaRef &&
                mediaRef.current &&
                mediaRef.current.duration &&
                generatePreviousTimingsUpToCurrent(parseInt(currentTime))}"]{
                color:  #c8c8c8 !important;
              }
          `}
          </style> */}
      <style scoped>
        {`  .timecode[data-previous-timings*="${generatePreviousTimingsUpToCurrent(
          parseInt(currentTime)
        )}"]{
              opacity:  0.1 !important;
            }`}
      </style>
      <style scoped>
        {`.editor-wrapper-container{
                padding: 8px 16px;
                background: #f9f9f9;
                box-shadow: 0 0 10px #ccc;
                height: 40vh;
                width: 100%;
                overflow: auto;
                justify-content: center,
              }
              /* https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
              TODO: only working in Chrome, not working in Firefox, and Safari - OSX
              if selecting text, not showing selection
              Commented out because it means cannot select speakers and timecode anymore
              which is the intended default behavior but needs to come with export
              functionality to export as plain text, word etc.. otherwise user won't be able
              to get text out of component with timecodes and speaker names in the interim */
              .unselectable {
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
              .timecode:hover{
                text-decoration: underline;
              }
              .timecode.text:hover{
                text-decoration:none;
              }
              `}
      </style>

      {value.length !== 0 ? (
        <>
          <section className="editor-wrapper-container">
            <Slate
              editor={editor}
              value={value}
              onChange={(value) => {
                if (props.handleAutoSaveChanges) {
                  props.handleAutoSaveChanges(value);
                }
                return setValue(value);
              }}
            >
              <Editable
                readOnly={true}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
              />
            </Slate>
          </section>
        </>
      ) : (
        <section className="text-center">
          <i className="text-center">Loading...</i>
        </section>
      )}
    </Container>
  );
}

SlateTranscriptEditor.propTypes = {
  transcriptData: PropTypes.object.isRequired,
  handleSaveEditor: PropTypes.func,
  handleAutoSaveChanges: PropTypes.func,
  autoSaveContentType: PropTypes.string,
  isEditable: PropTypes.bool,
  showTimecodes: PropTypes.bool,
  showSpeakers: PropTypes.bool,
  title: PropTypes.string,
  showTitle: PropTypes.bool,
  mediaType: PropTypes.string,
  transcriptDataLive: PropTypes.object,
};

SlateTranscriptEditor.defaultProps = {
  showTitle: false,
  showTimecodes: true,
  showSpeakers: true,
  mediaType: "digitalpaperedit",
  isEditable: true,
};
