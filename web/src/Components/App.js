import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Routes/Home";
import Event from "./Routes/EventFromStorage";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              Bring it!
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.handleCreate}
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </nav>
        <br />
      </React.Fragment>
    );
  }
}

class App extends React.Component {
  handleCreate = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header />
        </Router>
        <div className="container">
          <Router>
            <Switch>
              <Route path="/events/:id" component={Event} />
              <Route component={Home} />
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
