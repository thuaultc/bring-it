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

        var base = "http://localhost:8080";

        fetch(base+"/api/events/"+this.props.match.params.id)
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
            <div className="container">
            <section className="hero">
              <div className="hero-body">
                    <a href="/">Index</a>
                    <hr/>
                  <h1>{this.state.title}</h1>
                  <ul>
                    <li><i className="fas fa-location-arrow"></i> {this.state.location}</li>
                    <li><i className="fas fa-clock"></i> {this.state.date.toLocaleTimeString()}</li>
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
