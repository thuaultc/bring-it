import React from "react";
import styled from "styled-components";

const GuestWrapper = styled.form`
  display: flex;

  justify-content: space-between;

  margin-top: 1em;
`;

const Button = styled.button`
  flex: 0.2;
`;

const Input = styled.input`
  flex: 0.8;
  padding-left: 0.5em;
`;

const NumberInput = Input.extend`
  max-width: 2em;

  margin-left: 1em;
`;

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: {
        name: props.name,
        count: props.count
      },
      hasChanges: false
    };
  }

  handleChange = key => ev => {
    let value = ev.target.value;

    if (key === "count") {
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

  handleGuestSave = ev => {
    ev.preventDefault();

    const isDelete = !this.state.hasChanges;

    if (isDelete) {
      this.props.onGuestDelete();
    } else {
      this.setState(
        prev => {
          const keys = Object.keys(prev.payload);

          let nextState = prev;
          keys.forEach(key => {
            let value = prev.payload[key];

            if (key === "count" && value === "") {
              nextState[key] = "0";
            }
          });

          return nextState;
        },
        () => {
          this.props.onGuestUpdate(this.state.payload);
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
      <GuestWrapper onSubmit={this.handleGuestSave}>
        <Button
          type="submit"
          style={{
            backgroundColor: this.state.hasChanges
              ? "greenyellow"
              : "transparent"
          }}
        >
          {this.state.hasChanges ? "Save" : "Delete"}
        </Button>
        <Input
          value={this.state.payload.name}
          onChange={this.handleChange("name")}
        />
        <NumberInput
          value={this.state.payload.count}
          onChange={this.handleChange("count")}
        />
      </GuestWrapper>
    );
  }
}

export default Guest;
