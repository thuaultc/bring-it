import * as React from "react";
import styled from "styled-components";

import EventDescription from "./EventDescription";
import Inventory from "./Inventory";

const EventWrapper = styled.div`
  height: 100vh;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;

  background-image: linear-gradient(
    to left top,
    #051937,
    #004d7a,
    #008793,
    #00bf72,
    #a8eb12
  );
`;

const EventDescriptionWrapper = styled.div`
  height: 200px;
  width: 600px;

  background: white;
  border-radius: 5px;

  margin: 8px 0;
`;

const EventInventoryWrapper = styled.div`
  height: 200px;
  width: 600px;

  background: white;
  border-radius: 5px;
`;

function Event(props) {
  return (
    <EventWrapper>
      <EventDescriptionWrapper>
        <EventDescription
          name={props.name}
          eventDate={props.eventDate}
          creationDate={props.creationDate}
          address={props.address}
          description={props.description}
        />
      </EventDescriptionWrapper>
      <EventInventoryWrapper>
        <Inventory items={props.items} />
      </EventInventoryWrapper>
    </EventWrapper>
  );
}

export default Event;
