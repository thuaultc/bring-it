import React from "react";
import styled from "styled-components";

import { store } from "./App";

const EventDescriptionWrapper = styled.form`
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2em 2em 2em 1fr;
  grid-gap: 0.5em;

  padding: 0.5em;

  overflow: hidden;
`;

const EventName = styled.div`
  grid-column: 1 / 3;
  grid-row: 1;

  line-height: 2em;

  display: flex;
`;

const EventDate = styled.div`
  grid-column: 1 / 3;
  grid-row: 2;

  line-height: 2em;

  display: flex;

  overflow: hidden;
`;

const Address = styled.div`
  grid-column: 1 / 3;
  grid-row: 3;

  display: flex;
  height: 2em;
`;

const EventDescriptionArea = styled.textarea`
  grid-column: 1 / 3;
  grid-row: 4;

  resize: none;
`;

const Input = styled.input`
  flex: 1;

  margin-left: 1em;
  padding-left: 0.5em;
`;

const Label = styled.div`
  flex: 0.15;
  flex-shrink: 0;

  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  grid-column: 1 / 3;

  background-color: greenyellow;
`;

class EventDescription extends React.Component {
  state = {
    payload: {
      name: "",
      eventDate: "",
      creationDate: "",
      address: "",
      description: ""
    },
    hasChanges: false
  };

  handleChange = key => ev => {
    const value = ev.target.value;

    this.setState(prev => ({
      ...prev,
      payload: { ...prev.payload, [key]: value },
      hasChanges: true
    }));
  };

  handleUpdate = async(ev) => {
    ev.preventDefault();

    const nextPayload = {
      ...this.props,
      ...this.state.payload
    };

    await store.updateEventDesc(nextPayload, this.props.id);

    this.setState({ hasChanges: false });
  };

  /** Initialize the component state from props. */
  componentDidUpdate(prevProps) {
    const keys = Object.keys(this.state.payload);

    let stateChunk = {};
    let hasChanged = false;
    keys.forEach(key => {
      if (prevProps[key] === this.props[key]) {
        return;
      }

      let value = this.props[key];

      if (
        key === "eventDate" &&
        value.length > 0 &&
        value[value.length - 1] === "Z"
      ) {
        value = value.substr(0, value.length - 1);
      }

      hasChanged = true;
      stateChunk[key] = value;
    });

    if (hasChanged) {
      this.setState(prev => ({
        ...prev,
        payload: { ...prev.payload, ...stateChunk }
      }));
    }
  }

  render() {
    return (
      <EventDescriptionWrapper onSubmit={this.handleUpdate}>
        <EventName>
          <Label>
            <span>{"Quoi"}</span>
            <span>{"?"}</span>
          </Label>
          <Input
            value={this.state.payload.name}
            onChange={this.handleChange("name")}
          />
        </EventName>
        <EventDate>
          <Label>
            <span>{"Quand"}</span>
            <span>{"?"}</span>
          </Label>
          <Input
            type="datetime-local"
            value={this.state.payload.eventDate}
            onChange={this.handleChange("eventDate")}
          />
        </EventDate>
        <Address>
          <Label>
            <span>{"Où"}</span>
            <span>{"?"}</span>
          </Label>
          <Input
            value={this.state.payload.address}
            onChange={this.handleChange("address")}
          />
        </Address>
        <EventDescriptionArea
          value={this.state.payload.description}
          onChange={this.handleChange("description")}
        />
        {this.state.hasChanges && (
          <Button type="submit">Enregister les changements</Button>
        )}
      </EventDescriptionWrapper>
    );
  }
}

export default EventDescription;
