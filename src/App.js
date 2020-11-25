import "./App.css";

import Demo from "./Pages/Demo";
import DemoVideo from "./Pages/DemoVideo";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/demo1">Demo1</Link>
            </li>
            <li>
              <Link to="/about">Demo2</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/demo1">
            <Demo />
          </Route>
          <Route path="/about">
            <DemoVideo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
