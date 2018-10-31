import React from "react";

import { store } from "../App";
import Event from "../Event";

export default class EventFromStorage extends React.Component {
  state = { 
    name: "Default",
    eventDate: "",
    creationDate: "",
    address: "Void",
    description: "Nil",
    items: []
  };

  async componentDidMount() {
    const { match } = this.props;
    const event = await store.getEvent(match.params.id)
    this.setState(event);
  }

  render() {
    return (
      <Event
        id={this.props.match.params.id}
        name={this.state.name}
        eventDate={this.state.eventDate}
        creationDate={this.state.creationDate}
        address={this.state.address}
        description={this.state.description}
        items={this.state.items} 
      />
    );
  }
}
