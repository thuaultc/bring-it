import React from 'react'
import Name from './Name'
import Count from './Count'
import GuestList from './GuestList'

function Item (props) {
    return <div>
        <Name name={props.name}/>
        {"Got"}
        <Count count={props.count}/>
        {"/"}
        <Count count={props.needed}/>
        <GuestList guests={props.guests}/>
    </div>
}

export default Item