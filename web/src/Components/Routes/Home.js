import React from "react";
import styled from "styled-components";

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
    event_date: "",
    creation_date: "",
    address: "",
    description: ""
  };

  handleChange = key => ev => {
    this.setState({ [key]: ev.target.value });
  };

  handleCreate = ev => {
    ev.preventDefault();
    const id = window.bringit.Storage.createEvent({
      ...this.state,
      creation_date: new Date(),
      event_date: new Date(this.state.event_date),
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
                className="input"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange("name")}
              />
              <input
                className="input"
                type="date"
                placeholder="Date"
                value={this.state.event_date}
                onChange={this.handleChange("event_date")}
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
