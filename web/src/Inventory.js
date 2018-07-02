import React from 'react'
import Item from './Item'

function Inventory (props) {
    const items = props.items.map((item, index) => {
        return <Item key={index} name={item.name} count={item.count} needed={item.needed} guests={item.guests}/>
    })

    return <div>{items}</div>
}

export default Inventory