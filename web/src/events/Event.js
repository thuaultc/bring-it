import React, { Component } from 'react';
import Item from './Item';

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "fixme",
            location: "fixme",
            description: "fixme",
            event_date: new Date(),
            creation_date: new Date(),
            items: [],
            users: [],
            inventory: []
        };

        var base = "https://api.bring-it.thuault.com";

        fetch(base + "/events/" + this.props.match.params.id)
          .then((resp) => resp.json())
          .then((data) => {
            this.setState({
                title: data.name,
                address: data.address,
                description: data.description,
                event_date: new Date(data.event_date),
                creation_date: new Date(data.creation_date),
                items: data.items,
                users: data.users,
                inventory: data.inventory
            })
          })
          .catch((err) => {
            console.log(err)
          })
    }

    render() {
        const listItems = this.state.items.map((item) =>
            <Item key={item.id} name={item.name} from={item.from}/>
        );

        return (
            <div className="container">
            <section className="hero">
              <div className="hero-body">
                  <h1>{this.state.title}</h1>
                  <ul>
                    <li><i className="fas fa-location-arrow"></i> {this.state.address}</li>
                    <li><i className="fas fa-clock"></i> {this.state.event_date.toLocaleTimeString()}</li>
                    <li><i className="fas fa-clock"></i> {this.state.creation_date.toLocaleTimeString()}</li>
                    <li><i className="fas fa-info-circle"></i> {this.state.description}</li>
                  </ul>
              </div>
            </section>
            <section className="section">
                    <h2>Items</h2>
                    <ul>{listItems}</ul>
                    <hr/>
                    <form>
                      <label>
                        Name:
                        <input type="text" name="name" />
                        Item:
                        <input type="text" name="item" />
                        Quantity:
                        <input type="number" name="quantity" />
                      </label>
                      <input className="btn btn-primary" type="submit" value="Add" />
                    </form>
            </section>
            </div>
        );
    }
}

export default Event;
