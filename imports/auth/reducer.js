import { METEOR_LOGIN, METEOR_LOGOUT } from './actions';
import merge from 'lodash/merge';
function getDefaultState() {
    return {
        getUser: () => null,
        id: null
    }
}

export default function authReducer( state, action ) {
    if(state === undefined) return getDefaultState();
    switch( action.type ) {
        case METEOR_LOGIN  : return action.value;
        case METEOR_LOGOUT : return getDefaultState();
        default : return state;
    }
}