import React from "react";

import Event from "../Components/Event";

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

export default class EventFromStorage extends React.Component {
  render() {
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
  }
}
