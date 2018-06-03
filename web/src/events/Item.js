import React, { Component } from 'react';

class Item extends Component {
    render() {
        const listItems = this.props.from.map((f) =>
            <li color="grey">x{f.quantity} - {f.name}</li>
        );

        return (
            <li>
                {this.props.name}
                <ul>{listItems}</ul>
            </li>
        );
    }
}

export default Item;
