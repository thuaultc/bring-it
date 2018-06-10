import React, { Component } from 'react';

class Item extends Component {
    render() {
        return (
            <li>
                <details>
                    <summary>{this.props.needed} {this.props.name}</summary>
                </details>
            </li>
        );
    }
}

export default Item;
