import React, { Component } from 'react';
import Event from './events/Event';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Index extends Component {
    render() {
        return (
            <section>
                <div className="jumbotron">
                      <h1 className="display-4">Bring it!</h1>
                      <p className="lead">A simple application to settle on who is bringing what to your next event!</p>
                      <hr className="my-4"/>
                      <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#" role="button">Create an event</a>
                      </p>
                </div>

                <h2>Example events</h2>
                <ul>
                    <li><a href="/events/1">1</a></li>
                    <li><a href="/events/42">42</a></li>
                </ul>
            </section>
        );
    }
}

class App extends Component {
  render() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                  <a className="navbar-brand" href="/">Bring it!</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
              </div>
            </nav>
            <br/>

            <div className="container">
                <Router>
                    <Switch>
                        <Route path="/events/:id" component={Event} />
                        <Route component={Index} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
  }
}

export default App;
