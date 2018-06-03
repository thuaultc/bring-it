import React, { Component } from 'react';

class Item extends Component {
    render() {
        const listItems = this.props.from.map((f) =>
            <li color="grey">{f.name} will bring {f.quantity}</li>
        );

        let sum = function(items, prop){
            return items.reduce( function(a, b){
                return a + b[prop];
            }, 0);
        };

        const total = sum(this.props.from, "quantity")

        return (
            <li>
                <details>
                    <summary>{total} {this.props.name}</summary>
                    <ul>{listItems}</ul>
                </details>
            </li>
        );
    }
}

export default Item;
