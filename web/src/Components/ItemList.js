import * as React from "react";
import styled from "styled-components";

import { store } from "./App";
import Item from "./Item";

const ItemListWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  padding: 0.5em;
`;

const ItemListHeader = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;

  margin: 0.5em 0;
`;

export default class ItemList extends React.Component {
  state = {
    payload: {
      items: []
    }
  };

  handleUpdateItems = (prevItems, index) => item => {
    const items = [...prevItems];
    items[index] = item;
    this.setState(
      prev => ({
        payload: { items }
      }),
      () => {
        store.updateEvent(this.state.payload, this.props.id);
      }
    );
  };

  handleNewDrink = ev => {
    const newItem = {
      name: "Default",
      count: 0,
      needed: 0,
      guests: [
        {
          name: "Jean Michelle de la Bière",
          count: 0
        }
      ]
    };
    this.setState(
      prev => ({
        payload: { items: [...prev.payload.items, newItem] }
      }),
      () => {
        store.updateEvent(this.state.payload, this.props.id);
      }
    );
  };

  /** Initialize the component state from props. */
  componentDidUpdate(prevProps) {
    const keys = Object.keys(this.state.payload);

    let stateChunk = {};
    let hasChanged = false;
    keys.forEach(key => {
      if (prevProps[key] === this.props[key]) {
        return;
      }

      let value = this.props[key];

      hasChanged = true;
      stateChunk[key] = value;
    });

    if (hasChanged) {
      this.setState(prev => ({
        ...prev,
        payload: { ...prev.payload, ...stateChunk }
      }));
    }
  }

  renderItems() {
    const items = this.state.payload.items;
    return items.map((item, index) => {
      return (
        <Item
          key={index}
          name={item.name}
          count={item.count}
          needed={item.needed}
          guests={item.guests}
          onUpdateItem={this.handleUpdateItems(items, index)}
        />
      );
    });
  }

  render() {
    return (
      <ItemListWrapper>
        <button onClick={this.handleNewDrink}>New Drink</button>
        <ItemListHeader>
          <div style={{ flex: "0.8" }}>What ?</div>
          <div style={{ flex: "0.2", justifyContent: "flex-end" }}>
            Current/Total
          </div>
        </ItemListHeader>
        {this.renderItems()}
      </ItemListWrapper>
    );
  }
}
