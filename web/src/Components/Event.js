import * as React from "react";
import styled from "styled-components";

import EventDescription from "./EventDescription";
import ItemList from "./ItemList";

const EventWrapper = styled.div`
  height: 100vh;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
`;

const EventDescriptionWrapper = styled.div`
  height: 350px;
  width: 600px;

  background: #f1f1f1;
  border-radius: 5px;

  /* Add shadows to create the "card" effect */
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

  margin: 8px 0;
`;

const EventItemListWrapper = styled.div`
  height: 200px;
  width: 600px;

  background: #f1f1f1;
  border-radius: 5px;

  /* Add shadows to create the "card" effect */
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

function Event(props) {
  return (
    <EventWrapper>
      <EventDescriptionWrapper>
        <EventDescription
          id={props.id}
          name={props.name}
          eventDate={props.eventDate}
          creationDate={props.creationDate}
          address={props.address}
          description={props.description}
        />
      </EventDescriptionWrapper>
      <EventItemListWrapper>
        <ItemList items={props.items} />
      </EventItemListWrapper>
    </EventWrapper>
  );
}

export default Event;
