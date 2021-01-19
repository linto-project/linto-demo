import "./App.css";

import DemoVideoAudio from "./page/DemoVideoAudio";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

// import SlateTranscriptEditor from "slate-transcript-editor";
// you need to import bootstrap separatly
import "bootstrap-css-only";

const App = () => {
  return (
    <Router>
      <div>
        <DemoVideoAudio />
      </div>
    </Router>
  );
};

export default App;
