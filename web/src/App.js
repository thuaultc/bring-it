import React, { Component } from 'react';
import Event from './events/Event';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Index extends Component {
    render() {
        return (
            <section className="section">
                            <div className="container">
                <h1>Index</h1>

                <h2>Example events</h2>
                <ul>
                    <li><a href="/events/1">1</a></li>
                    <li><a href="/events/42">42</a></li>
                </ul>
            </div>
            </section>
        );
    }
}

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
                <Route path="/events/:id" component={Event} />
                <Route component={Index} />
            </Switch>
        </Router>
    );
  }
}

export default App;
