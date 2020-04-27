import React from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import Chat from "./components/chat";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                <Login />
              </React.Fragment>
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <React.Fragment>
                <Login />
              </React.Fragment>
            )}
          />
          <Route
            path="/signup"
            render={(props) => (
              <React.Fragment>
                <Signup />
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/chat"
            render={(props) => (
              <React.Fragment>
                <Chat />
              </React.Fragment>
            )}
          />
          {/* <Route path="/about" component={About} /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
