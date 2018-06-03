import React, { Component } from 'react';
import Item from './Item';

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "fixme",
            location: "fixme",
            description: "fixme",
            date: new Date(),
            items: [],
        };

        var base = "https://bring-it.thuault.com";

        fetch(base+"/api/events/42")
          .then((resp) => resp.json())
          .then((data) => {
            this.setState({
                title: data.name,
                location: data.location,
                description: data.description,
                date: new Date(),
                items: data.items,
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
            <div>
            <section className="hero">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title is-1">{this.state.title}</h1>
                  <ul>
                    <li><i className="fas fa-location-arrow"></i> {this.state.location}</li>
                    <li><i className="fas fa-clock"></i> {this.state.date.toLocaleTimeString()}</li>
                    <li><i className="fas fa-info-circle"></i> {this.state.description}</li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="section">
                <div className="container">
                    <h2 className="title is-2">Items</h2>
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
                      <input className="button is-primary" type="submit" value="Add" />
                    </form>
                </div>
            </section>
            </div>
        );
    }
}

export default Event;
