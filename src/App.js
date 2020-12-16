import "./App.css";

import DemoVideoAudio from "./Pages/DemoVideoAudio";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

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
