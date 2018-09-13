import React from "react";
import styled from "styled-components";

import Count from "./Count";
import Name from "./Name";

const GuestWrapper = styled.div`
  display: flex;
`;

function Guest(props) {
  return (
    <GuestWrapper>
      <Name name={props.name} />
      {" / "}
      <Count count={props.count} />
    </GuestWrapper>
  );
}

export default Guest;
