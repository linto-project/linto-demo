import "./App.css";

// import Demo from "./pages/Demo";
// import DemoVideo from "./pages/DemoVideo";
// import DemoAudio from "./pages/DemoAudio";
import DemoVideoAudio from "./pages/DemoVideoAudio";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/demo1">Demo 1</Link>
            </li>
            <li>
              <Link to="/demo2">Demo 2</Link>
            </li>
            <li>
              <Link to="/demo3">Demo 3</Link>
            </li>
            <li>
              <Link to="/demo4">Demo 4</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {/* <Switch>
          <Route path="/demo1">
            <Demo />
          </Route>
          <Route path="/demo2">
            <DemoVideo />
          </Route>
          <Route path="/demo3">
            <DemoAudio />
          </Route>
          <Route path="/demo4">
            <DemoVideoAudio />
          </Route>
        </Switch> */}
        <DemoVideoAudio />
      </div>
    </Router>
  );
};

export default App;
