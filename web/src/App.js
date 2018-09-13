import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Event from "./Event";

class Index extends Component {
  render() {
    return (
      <section>
        <div className="jumbotron">
          <h1 className="display-4">Bring it!</h1>
          <p className="lead">
            A simple application to settle on who is bringing what to your next
            event!
          </p>
          <hr className="my-4" />
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">
              Create an event
            </a>
          </p>
        </div>

        <h2>Example events</h2>
        <ul>
          <li>
            <a href="/events/bcenr2tokq1rese4e80g">bcenr2tokq1rese4e80g</a>
          </li>
        </ul>
      </section>
    );
  }
}

class App extends Component {
  render() {
    const items = [
      {
        name: "Pack Leffe x6",
        count: 4,
        needed: 4,
        guests: [
          {
            name: "clément",
            count: 2
          },
          {
            name: "toto",
            count: 2
          }
        ]
      },
      {
        name: "Vodka 1L",
        count: 1,
        needed: 0,
        guests: [
          {
            name: "clément",
            count: 1
          }
        ]
      }
    ];

    const eventDesc = {
      name: "tata",
      event_date: "2018-06-12T21:00:00Z",
      creation_date: "2018-06-10T18:04:05Z",
      address: "14 avenue marcel martinie, Vanves, France",
      description: "ca va être cool"
    };

    return (
      <Event
        name={eventDesc.name}
        eventDate={eventDesc.eventDate}
        creationDate={eventDesc.creationDate}
        address={eventDesc.address}
        description={eventDesc.description}
        items={items}
      />
    );

    // return (
    //   <div>
    //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //       <div className="container">
    //         <a className="navbar-brand" href="/">
    //           Bring it!
    //         </a>
    //         <button
    //           className="navbar-toggler"
    //           type="button"
    //           data-toggle="collapse"
    //           data-target="#navbarSupportedContent"
    //           aria-controls="navbarSupportedContent"
    //           aria-expanded="false"
    //           aria-label="Toggle navigation"
    //         >
    //           <span className="navbar-toggler-icon" />
    //         </button>
    //       </div>
    //     </nav>
    //     <br />

    //     <div className="container">
    //       <Router>
    //         <Switch>
    //           <Route path="/events/:id" component={Event} />
    //           <Route component={Index} />
    //         </Switch>
    //       </Router>
    //     </div>
    //   </div>
    // );
  }
}

export default App;
