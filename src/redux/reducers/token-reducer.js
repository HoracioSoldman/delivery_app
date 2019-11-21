import {SAVE_TOKEN} from '../actions/action-types'

export function tokenReducer(state = '', action){
    switch(action.type){
        case SAVE_TOKEN:
            return action.payload;
        default: 
            return state;
    }

}