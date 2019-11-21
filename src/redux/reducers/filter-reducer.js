import {FILTER_TABLE} from '../actions/action-types'

export function filterReducer(state = '', action){
    switch(action.type){
        case FILTER_TABLE:
            return action.payload;
        default: 
            return state;
    }

}