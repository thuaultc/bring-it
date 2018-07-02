import React from 'react'
import Count from './Count'
import Name from './Name'

function Guest (props) {
    return <div>
        <Name name={props.name}/>  
        <Count count={props.count}/>
    </div>
}

export default Guest