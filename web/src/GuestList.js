import React from 'react'
import Guest from './Guest'

function GuestList (props) {
    const guests = props.guests.map((guest, index) => {
        return <Guest key={index} name={guest.name} count={guest.count}/>
    })

    return <div>{guests}</div>
}

export default GuestList