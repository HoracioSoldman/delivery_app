import {FETCH_BIKERS, UPDATE_BIKERS} from '../actions/action-types'

export const userReducer = (state = [], action)=>{
    switch(action.type){
        case FETCH_BIKERS:
        case UPDATE_BIKERS:
            return action.payload;
        default:
            return state;

    }
}