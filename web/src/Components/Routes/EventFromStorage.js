import React from "react";

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
    event_date: "",
    creation_date: "",
    address: "Void",
    description: "Nil",
    items: []
  };

  componentDidMount() {
    const { match } = this.props;
    const event = JSON.parse(window.bringit.Storage.getEvent(match.params.id));
    this.setState(event.payload);
  }

  render() {
    return (
      <Event
        name={this.state.name}
        eventDate={this.state.event_date}
        creationDate={this.state.creation_date}
        address={this.state.address}
        description={this.state.description}
        items={this.state.items}
      />
    );
  }
}
