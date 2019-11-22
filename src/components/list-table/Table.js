import React from 'react'
import {TableStyle} from '../stylus'
import ShipmentItem from '../manager/shipment/ShipmentItem'
import OrderItem from '../biker/order/OrderItem'

export default function Table(props) {
    return (
        <TableStyle>
            <table>
                <thead>
                    <tr>
                        {props.header.map((th, i) =>(
                            <th key={i}>{th}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.user_role === 'Manager' ? 
                        props.body.map((item, i) =>(
                            <ShipmentItem key={item.id} shipment={item} indx={i+1} />
                        ))
                        :
                        props.body.map((item, i) =>(
                            <OrderItem key={item.id} indx={i+1} order={item}/>
                        ))
                    }
                    
                </tbody>
            </table>
        </TableStyle>
        
    )
}
