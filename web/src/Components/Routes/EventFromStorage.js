import React from "react";

import { store } from "../App";
import Event from "../Event";

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

export default class EventFromStorage extends React.Component {
  state = {
    name: "Default",
    eventDate: "",
    creationDate: "",
    address: "Void",
    description: "Nil",
    items: []
  };

  componentDidMount() {
    const { match } = this.props;
    const event = JSON.parse(store.getEvent(match.params.id));
    this.setState(event.payload);
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
