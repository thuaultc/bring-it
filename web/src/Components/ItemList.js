import React from "react";
import styled from "styled-components";

import Item from "./Item";

const ItemListWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-flow: column nowrap;

  padding: 0.5em;
`;

export default function ItemList(props) {
  const items = props.items.map((item, index) => {
    return (
      <Item
        key={index}
        name={item.name}
        count={item.count}
        needed={item.needed}
        guests={item.guests}
      />
    );
  });

  return <ItemListWrapper>{items}</ItemListWrapper>;
}
