import React from 'react'

function EventDescription (props) {
    return <div>
        <div>{props.name}</div>
        <div>{props.eventDate}</div>
        <div>{props.creationDate}</div>
        <div>{props.address}</div>
        <div>{props.description}</div>
    </div>
}

export default EventDescription