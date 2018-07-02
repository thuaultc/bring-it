import React from 'react'
import EventDescription from './EventDescription'
import Inventory from './Inventory';

function Event (props) {
    return <div>
        <EventDescription name={props.name} eventDate={props.eventDate} creationDate={props.creationDate} address={props.address} description={props.description}/>
        <Inventory items={props.items}/>
    </div>
}

export default Event