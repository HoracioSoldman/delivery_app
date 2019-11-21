import {combineReducers} from 'redux'
import {shipmentReducer} from './shipment-reducer'
import {tokenReducer} from './token-reducer'
import {userReducer} from './user-reducer'
import {filterReducer} from './filter-reducer'

export default combineReducers({
    shipments: shipmentReducer,
    bikers: userReducer,
    token: tokenReducer,
    filter: filterReducer
})