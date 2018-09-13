import * as React from "react";
import styled from "styled-components";

import GuestList from "./GuestList";

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const CounterGroup = styled.div`
  display: flex;
`;
const CurrentAmount = styled.div``;
const TotalAmount = styled.div``;

function Item(props) {
  return (
    <ItemWrapper>
      <div className="name">{props.name}</div>
      <CounterGroup>
        <CurrentAmount>{props.count}</CurrentAmount>
        {"/"}
        <TotalAmount>{props.needed}</TotalAmount>
      </CounterGroup>
      <GuestList guests={props.guests} />
    </ItemWrapper>
  );
}

export default Item;
