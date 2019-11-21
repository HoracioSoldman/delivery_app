import React from 'react'
import OrderDateField from './OrderDateField'

export default function OrderItem(props) {
    const {id, origin, destination, pickup, delivery} = props.order;
    return (
        <tr >
            <td>{props.indx}</td>
            <td>{id}</td>
            <td>{origin}</td>
            <td>{destination}</td>
            <td>
                <OrderDateField order={props.order} date={pickup} type={'pick_up'}/>
                
            </td>
            <td>
            <OrderDateField order={props.order} date={delivery} type={'delivery'} />
               
            </td>
        </tr>
    )
}
