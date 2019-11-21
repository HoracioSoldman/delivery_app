import {FETCH_SHIPMENTS, ASSIGN_SHIPMENT, UPDATE_ORDER} from '../actions/action-types'

export const shipmentReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_SHIPMENTS:
        case ASSIGN_SHIPMENT:
        case UPDATE_ORDER:
            return action.payload;

        default:
            return state;
    }
}