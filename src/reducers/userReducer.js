import {USER_DATA, USER_DATA_ERROR} from '../constants/actionTypes';

export default function userReducer(state = {}, action) {
    const {payload} = action;

    switch (action.type) {
        case USER_DATA:
            return Object.assign({}, state, payload);
        case USER_DATA_ERROR:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

