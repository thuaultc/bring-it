import React from "react";
import styled from "styled-components";

import { store } from "../App";

const CreateForm = styled.form`
  min-height: 400px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
`;

const DescriptionArea = styled.textarea`
  min-height: 150px;
`;

export default class Home extends React.Component {
  state = {
    name: "",
    eventDate: "",
    creationDate: "",
    address: "",
    description: ""
  };

  handleChange = key => ev => {
    const value = ev.target.value;
    this.setState({ [key]: value });
  };

  handleCreate = ev => {
    ev.preventDefault();
    const id = store.createEvent({
      ...this.state,
      creationDate: new Date(),
      eventDate: new Date(this.state.eventDate).toISOString(),
      items: []
    });
    this.props.history.push(`/events/${id}`);
  };

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
          <div className="lead">
            <CreateForm onSubmit={this.handleCreate}>
              <input
                required
                className="input"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
              <input
                required
                className="input"
                type="datetime-local"
                placeholder="Date"
                value={this.state.eventDate}
                onChange={this.handleChange("eventDate")}
              />
              <input
                className="input"
                placeholder="Adresse"
                value={this.state.address}
                onChange={this.handleChange("address")}
              />
              <DescriptionArea
                type="text"
                placeholder="Description"
                value={this.state.description}
                onChange={this.handleChange("description")}
              />
              <button type="submit" className="btn btn-primary btn-lg">
                Create an event
              </button>
            </CreateForm>
          </div>
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
