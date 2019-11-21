import React from 'react'
import OrderItem from './OrderItem'
import {TableStyle} from '../../stylus'
export default function Orders(props) {
    return (
        <TableStyle>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Pick Up</th>
                        <th>Delivery</th>
                    </tr>
                </thead>
                <tbody>
                    {props.orders.map((order, i) =>(
                        <OrderItem key={order.id} indx={i+1} order={order}/>
                    ))}
                    
                </tbody>
            </table>
            
        </TableStyle>
    )
}
