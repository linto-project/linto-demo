import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import path from "path";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { createEditor, Editor, Transforms } from "slate";
// https://docs.slatejs.org/walkthroughs/01-installing-slate
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import convertDpeToSlate from "../util/dpe-to-slate";

import { useGlobalContext } from "../../../components/Provider";

const TOOTLIP_LONGER_DELAY = 2000;

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default function SlateTranscriptEditor(props) {
  const { Player, confDemo } = useGlobalContext();
  const { getTime } = Player;

  // const typeAnnot = confDemo.getConf().typeAnnotationDialogue;
  const actLanguage = confDemo.getConf().actLanguage;

  const timeTemp = getTime();
  useEffect(() => {
    // Add little offset to componsate react hook delay
    handleTimeUpdated(timeTemp + 1);
  }, [timeTemp]);

  const [currentTime, setCurrentTime] = useState(0);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [value, setValue] = useState([]);
  const defaultShowSpeakersPreference =
    typeof props.showSpeakers === "boolean" ? props.showSpeakers : true;
  const defaultShowTimecodesPreference =
    typeof props.showTimecodes === "boolean" ? props.showTimecodes : true;
  // const [showSpeakers, setShowSpeakers] = useState(
  //   defaultShowSpeakersPreference
  // );
  // const [showTimecodes, setShowTimecodes] = useState(
  //   defaultShowTimecodesPreference
  // );

  const [showSpeakers] = useState(defaultShowSpeakersPreference);
  const [showTimecodes] = useState(defaultShowTimecodesPreference);

  useEffect(() => {
    if (props.transcriptData) {
      const res = convertDpeToSlate(props.transcriptData);
      setValue(res);
    }
    // eslint-disable-next-line
  }, []);

  // handles interim results for worrking with a Live STT
  useEffect(() => {
    if (props.transcriptDataLive) {
      const nodes = convertDpeToSlate(props.transcriptDataLive);
      // if the user is selecting the / typing the text
      // Transforms.insertNodes would insert the node at seleciton point
      // instead we check if they are in the editor
      if (editor.selection) {
        // get the position of the last node
        const positionLastNode = [editor.children.length];
        // insert the new nodes at the end of the document
        Transforms.insertNodes(editor, nodes, {
          at: positionLastNode,
        });
      }
      // use not having selection in the editor allows us to also handle the initial use case
      // where the might be no initial results
      else {
        // if there is no selection the default for insertNodes is to add the nodes at the end
        Transforms.insertNodes(editor, nodes);
      }
    }
    // eslint-disable-next-line
  }, [props.transcriptDataLive]);

  // useEffect(() => {
  //   const getUniqueSpeakers = pluck("speaker");
  //   const uniqueSpeakers = getUniqueSpeakers(value);
  //   setSpeakerOptions(uniqueSpeakers);
  // }, [showSpeakersCheatShet]);

  // useEffect(() => {
  // Update the document title using the browser API
  // if (mediaRef && mediaRef.current) {
  // setDuration(mediaRef.current.duration);
  // mediaRef.current.addEventListener("timeupdate", handleTimeUpdated);
  // }
  // return function cleanup() {
  // removeEventListener
  // mediaRef.current.removeEventListener("timeupdate", handleTimeUpdated);
  // };
  // }, []);

  // useEffect(() => {
  // Update the document title using the browser API
  // if (mediaRef && mediaRef.current) {
  // Not working
  // setDuration(mediaRef.current.duration);
  // if (
  // mediaRef.current.duration >=
  // MAX_DURATION_FOR_PERFORMANCE_OPTIMIZATION_IN_SECONDS
  // ) {
  // setShowSpeakers(false);
  // showTimecodes(false);
  // }
  // }
  // }, [mediaRef]);

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

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }) => {
      return (
        <span
          onDoubleClick={handleTimedTextClick}
          className={"timecode text"}
          data-start={children.props.parent.start}
          data-previous-timings={children.props.parent.previousTimings}
          title={children.props.parent.start}
          {...attributes}
        >
          {/* {children} */}

          <Row>
            <Col xs={actLanguage ? 7 : 12}>{children}</Col>
            {actLanguage && <Col xs={4}>{children.props.parent.actDialog}</Col>}
          </Row>
        </span>
      );
    },
    [actLanguage]
  );

  //

  /**
   * `handleSetSpeakerName` is outside of TimedTextElement
   * to improve the overall performance of the editor,
   * especially on long transcripts
   * @param {*} element - props.element, from `renderElement` function
   */
  const handleSetSpeakerName = (element) => {
    const pathToCurrentNode = ReactEditor.findPath(editor, element);
    const oldSpeakerName = element.speaker.toUpperCase();
    const newSpeakerName = prompt("Change speaker name", oldSpeakerName);
    if (newSpeakerName) {
      // const isUpdateAllSpeakerInstances = confirm(`Would you like to replace all occurrences of ${oldSpeakerName} with ${newSpeakerName}?`);
      const isUpdateAllSpeakerInstances = true;
      if (isUpdateAllSpeakerInstances) {
        const rangeForTheWholeEditor = Editor.range(editor, []);
        // Apply transformation to the whole doc, where speaker matches old spekaer name, and set it to new one
        Transforms.setNodes(
          editor,
          { type: "timedText", speaker: newSpeakerName },
          {
            at: rangeForTheWholeEditor,
            match: (node) =>
              node.type === "timedText" && node.speaker === oldSpeakerName,
          }
        );
      } else {
        // only apply speaker name transformation to current element
        Transforms.setNodes(
          editor,
          { type: "timedText", speaker: newSpeakerName },
          { at: pathToCurrentNode }
        );
      }
    }
  };

  const TimedTextElement = (props) => {
    let textLg = 12;
    let textXl = 12;
    // if (!showSpeakers && !showTimecodes) {
    //   textLg = 12;
    //   textXl = 12;
    // } else if (showSpeakers && !showTimecodes) {
    //   textLg = 9;
    //   textXl = 9;
    // } else if (!showSpeakers && showTimecodes) {
    //   textLg = 9;
    //   textXl = 10;
    // } else
    if (showSpeakers && showTimecodes) {
      textLg = 6;
      textXl = 7;
    }

    return (
      <Row {...props.attributes}>
        {showTimecodes && (
          <Col
            contentEditable={false}
            xs={4}
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
              onClick={handleTimedTextClick}
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
            xs={8}
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
                fontColor: "red",
              }}
              title={props.element.speaker.toUpperCase()}
              onClick={handleSetSpeakerName.bind(this, props.element)}
            >
              {" "}
              {props.element.speaker.toUpperCase()}
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
          {props.children}
        </Col>
      </Row>
    );
  };

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  const handleTimedTextClick = (e) => {
    if (e.target.classList.contains("timecode")) {
      // eslint-disable-next-line
      const start = e.target.dataset.start;
      // if (mediaRef && mediaRef.current) {
      //   mediaRef.current.currentTime = parseInt(start);
      //   mediaRef.current.play();
      // }
    } else if (e.target.dataset.slateString) {
      if (e.target.parentNode.dataset.start) {
        // eslint-disable-next-line
        const start = e.target.parentNode.dataset.start;
        // if (mediaRef && mediaRef.current && start) {
        //   mediaRef.current.currentTime = parseInt(start);
        //   mediaRef.current.play();
        // }
      }
    }
  };

  // const handleInsertMusicNote = ()=>{
  //   Transforms.insertText(editor, '♫'); // or ♪
  // }

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

  const getMediaType = () => {
    const clipExt = path.extname(props.mediaUrl);
    let tmpMediaType = props.mediaType ? props.mediaType : "video";
    if (
      clipExt === ".wav" ||
      clipExt === ".mp3" ||
      clipExt === ".m4a" ||
      clipExt === ".flac" ||
      clipExt === ".aiff"
    ) {
      tmpMediaType = "audio";
    }
    return tmpMediaType;
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#fff",
        paddingTop: "1em",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
      }}
    >
      <style scoped>
        {`  .timecode[data-previous-timings*="${generatePreviousTimingsUpToCurrent(
          parseInt(currentTime)
        )}"]{
                color:  #c8c8c8 !important;
            }`}

        {`span.Word[data-start="${parseInt(
          currentTime
        )}"] { background-color: #a2ffa2 }`}
      </style>
      <style scoped>
        {`.editor-wrapper-container{
                padding: 8px 16px;
                background: #f9f9f9;
                box-shadow: 0 0 10px #ccc;
                height: 40vh;
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
      {props.showTitle ? (
        <OverlayTrigger
          delay={TOOTLIP_LONGER_DELAY}
          placement={"bottom"}
          overlay={<Tooltip id="tooltip-disabled"> {props.title}</Tooltip>}
        >
          <h3 className={"text-truncate text-left"}>
            <small className="text-muted">{props.title}</small>
          </h3>
        </OverlayTrigger>
      ) : null}
      <Row
        style={{
          justifyContent: "center",
        }}
      >
        <Col
          xs={{ span: 12, order: 3 }}
          sm={
            getMediaType() === "audio"
              ? { span: 10, order: 2, offset: 1 }
              : { span: 7, order: 2 }
          }
          md={
            getMediaType() === "audio"
              ? { span: 10, order: 2, offset: 1 }
              : { span: 7, order: 2 }
          }
          lg={
            getMediaType() === "audio"
              ? { span: 8, order: 2, offset: 2 }
              : { span: 8, order: 2 }
          }
          xl={
            getMediaType() === "audio"
              ? { span: 8, order: 2, offset: 2 }
              : { span: 7, order: 2 }
          }
        >
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
        </Col>
      </Row>
    </Container>
  );
}

SlateTranscriptEditor.propTypes = {
  transcriptData: PropTypes.object.isRequired,
  mediaUrl: PropTypes.string.isRequired,
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
