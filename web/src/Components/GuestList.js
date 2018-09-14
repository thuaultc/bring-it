import React from "react";
import styled from "styled-components";

import Guest from "./Guest";

const GuestListWrapper = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: space-between;

  margin-bottom: 0.5em;
`;

class GuestList extends React.Component {
  handleNewGuest = ev => {
    const newGuest = {
      name: "Jean La Binouze",
      count: "0"
    };

    const nextGuest = [...this.props.guests, newGuest];

    this.props.onUpdateGuests(nextGuest);
  };

  handleGuestUpdate = (guests, index) => guest => {
    let nextGuests = [...guests];

    nextGuests[index] = guest;

    this.props.onUpdateGuests(nextGuests);
  };

  handleGuestDelete = index => () => {
    this.props.onUpdateGuests(this.props.guests.filter((_, i) => i !== index));
  };

  render() {
    const guests = this.props.guests.map((guest, index) => {
      return (
        <Guest
          key={index}
          name={guest.name}
          count={guest.count}
          onGuestUpdate={this.handleGuestUpdate(this.props.guests, index)}
          onGuestDelete={this.handleGuestDelete(index)}
        />
      );
    });

    return (
      <GuestListWrapper>
        <button onClick={this.handleNewGuest}>New Guest</button>
        {guests}
      </GuestListWrapper>
    );
  }
}

export default GuestList;
