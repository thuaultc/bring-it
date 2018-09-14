import * as React from "react";
import styled from "styled-components";

import GuestList from "./GuestList";

const ItemAndGuestWrapper = styled.div`
  border-top: 1px solid grey;
  margin-top: 1em;
  padding-top: 1em;
`;

const ItemWrapper = styled.form`
  width: 90%;

  position: relative;

  display: flex;
  justify-content: space-between;

  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid lightgrey;
`;

const CounterGroup = styled.div`
  display: flex;
`;
const CurrentAmount = styled.div``;
const TotalAmount = styled.div``;

const Input = styled.input`
  flex: 1;
  padding-left: 0.5em;
`;

const NumberInput = Input.extend`
  max-width: 2em;
`;

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: {
        name: props.name,
        count: props.count,
        needed: props.needed,
        guests: props.guests
      },
      hasChanges: false
    };
  }

  handleChange = key => ev => {
    let value = ev.target.value;

    if (key === "count" || key === "needed") {
      if (value !== "") {
        value = parseInt(value, 10);
      }
    }

    this.setState(prev => ({
      ...prev,
      payload: { ...prev.payload, [key]: value },
      hasChanges: true
    }));
  };

  handleItemSave = ev => {
    ev.preventDefault();

    let isDelete = !this.state.hasChanges;
    if (isDelete) {
      this.props.onDeleteItem();
    } else {
      this.setState(
        prev => {
          const keys = Object.keys(prev.payload);

          let nextState = prev;
          keys.forEach(key => {
            let value = prev.payload[key];

            if (key === "count" || (key === "needed" && value === "")) {
              nextState[key] = "0";
            }
          });

          return nextState;
        },
        () => {
          this.props.onUpdateItem(this.state.payload);
          this.setState({ hasChanges: false });
        }
      );
    }
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
      <ItemAndGuestWrapper>
        <ItemWrapper onSubmit={this.handleItemSave}>
          <button
            type="submit"
            style={{
              flex: "0.2",
              backgroundColor: this.state.hasChanges
                ? "greenyellow"
                : "transparent"
            }}
          >
            {this.state.hasChanges ? "Save" : "Delete"}
          </button>
          <div style={{ flex: "0.6" }}>
            <Input
              value={this.state.payload.name}
              onChange={this.handleChange("name")}
            />
          </div>
          <CounterGroup style={{ flex: "0.2" }}>
            <CurrentAmount>{this.state.payload.count}</CurrentAmount>
            {"/"}
            <TotalAmount>
              <NumberInput
                style={{ marginLeft: "0.2em" }}
                value={this.state.payload.needed}
                onChange={this.handleChange("needed")}
              />
            </TotalAmount>
          </CounterGroup>
        </ItemWrapper>
        <GuestList
          style={{ flex: "1" }}
          guests={this.state.payload.guests}
          onUpdateGuests={guests => {
            const nextPayload = {
              ...this.state.payload,
              count: guests.reduce(
                (acc, g) =>
                  (typeof g.count === "string"
                    ? parseInt(g.count, 10)
                    : g.count) + acc,
                0
              ),
              guests
            };

            this.props.onUpdateItem(nextPayload);
          }}
        />
      </ItemAndGuestWrapper>
    );
  }
}

export default Item;
