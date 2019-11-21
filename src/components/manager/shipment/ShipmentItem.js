import React from 'react'
import {connect} from 'react-redux'
import {updateShipment, formatDate} from '../../../redux/actions/shipment-actions'
import {AssignmentStyle, BikersList} from '../../stylus'
import PropTypes from 'prop-types'

function ShipmentItem(props) {

    const {id, origin, destination, status, assignee, pickup, delivery} = props.shipment;

    const assignShipment = (biker) => ev => {
        
        if(window.confirm(`Assign shipment: ${id} to ${biker.username} ?`)){
            let updatedShipment = props.shipment;
            updatedShipment.assignee = biker;
            updatedShipment.status = 'ASSIGNED';
            props.updateShipment(updatedShipment);
        }
    }
    
    return (
        
        <tr >
            <td>{props.indx}</td>
            <td>{id}</td>
            <td >{origin}</td>
            <td >{destination}</td>
            <td >{status}</td>
            <td >
                {
                    status === 'WAITING' ?
                    <AssignmentStyle>
                        <button onClick={props.requestBikers}>Assign to</button>
                        <BikersList>
                            {
                                props.bikers.map(biker => (
                                    <li key={biker.id} onClick={assignShipment(biker)}>{biker.username}</li>
                                ))
                            }
                            
                        </BikersList>
                    </AssignmentStyle> :
                    assignee.username

                }
                
            </td>
            <td  className="test-pickup">{pickup !== null ? formatDate(pickup) : '[Not Set]'}</td>
            <td  className="test-delivery">{delivery !== null ? formatDate(delivery) : '[Not Set]'}</td>
        </tr>
    )
}


const mapStateToProps = state => ({
    bikers: state.bikers,
    shipments: state.shipments
}) 

ShipmentItem.propTypes = {
    bikers: PropTypes.array,
    shipments: PropTypes.array,
    updateShipment: PropTypes.func
}

export default connect (mapStateToProps, {updateShipment})(ShipmentItem)

export {ShipmentItem};
