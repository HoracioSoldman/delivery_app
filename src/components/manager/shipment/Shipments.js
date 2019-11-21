import React from 'react'
import ShipmentItem from './ShipmentItem'
import {TableStyle} from '../../stylus'

const Shipments = (props) =>{
   
    return (
        <TableStyle>
            <table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>Assignee</th>
                        <th>Pick Up</th>
                        <th>Delivery</th>
                    </tr>
                </thead>
                <tbody>

                    {props.shipments.map((shp, i) =>(
                        <ShipmentItem key={shp.id} shipment={shp} indx={i+1} />
                    ))}
                    
                </tbody>
            </table>
        </TableStyle>
        
    )
}
export default Shipments;

