import {LOG_IN_SUCCESS, LOG_IN_ERROR} from '../constants/actionTypes';

export default function authReducer(state = {}, action) {
    const {payload} = action;

    switch (action.type) {
        case LOG_IN_SUCCESS:
            return Object.assign({}, state, payload);
        case LOG_IN_ERROR:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

