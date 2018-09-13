import * as React from "react";
import styled from "styled-components";

import Name from "./Name";
import Count from "./Count";
import GuestList from "./GuestList";

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-around;

  border: 1px solid red;
`;

const CounterGroup = styled.div`
  display: flex;
`;

function Item(props) {
  return (
    <ItemWrapper>
      <Name className="name" name={props.name} />
      <span>{"Got"}</span>
      <CounterGroup>
        <Count count={props.count} />
        {"/"}
        <Count count={props.needed} />
      </CounterGroup>
      <GuestList guests={props.guests} />
    </ItemWrapper>
  );
}

export default Item;
