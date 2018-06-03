import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Event from './events/Event';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Index extends Component {
    render() {
        return (
        <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            </div>
        );
    }
}

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/events/:id"} component={Event} />
                <Route component={Index} />
              </Switch>
            </Router>
    );
  }
}

export default App;
