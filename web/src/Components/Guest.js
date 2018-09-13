import React from "react";
import styled from "styled-components";

const GuestWrapper = styled.div`
  display: flex;
`;

function Guest(props) {
  return (
    <GuestWrapper>
      <div>{props.name}</div>
      {" / "}
      <div>{props.count}</div>
    </GuestWrapper>
  );
}

export default Guest;
