import React from "react";
import styled from "styled-components";

// import GoogleMap from "./Maps/OpenLayerMap";

const EventDescriptionWrapper = styled.div`
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 2em 1em 1fr;
  grid-gap: 0.5em;

  padding: 0.5em;

  overflow: hidden;
`;

const EventDescriptionName = styled.div`
  grid-column: 1 / 3;
  grid-row: 1;

  line-height: 2em;
`;

const EventDescriptionDate = styled.div`
  grid-column: 1 / 3;
  grid-row: 2;

  line-height: 1em;
`;

// const EventDescriptionCreationDate = styled.div`
//   background: purple;
// `;
/* <EventDescriptionCreationDate>
        {props.creationDate}
    </EventDescriptionCreationDate> */

const EventDescriptionDescription = styled.div`
  grid-column: 1;
  grid-row: 3;
`;

// const GoogleMapWrapper = styled(GoogleMap)`
//   grid-column: 2;
//   grid-row: 3;
// `;

const Address = styled.div`
  grid-column: 2;
  grid-row: 3;
`;

// {props.address}</div>
function EventDescription(props) {
  return (
    <EventDescriptionWrapper>
      <EventDescriptionName>Evénement: {props.name}</EventDescriptionName>
      <EventDescriptionDate>
        Quand ? {new Date(props.eventDate).toDateString()}
      </EventDescriptionDate>
      <EventDescriptionDescription>
        {props.description}
      </EventDescriptionDescription>
      <Address>{props.address}</Address>
      {/* <GoogleMapWrapper address={props.address} /> */}
    </EventDescriptionWrapper>
  );
}

export default EventDescription;
