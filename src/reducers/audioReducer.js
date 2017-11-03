import {SEARCH_SUCCESS, SEARCH_ERROR} from '../constants/actionTypes';

export default function audioReducer(state = {}, action) {
    const {payload} = action;

    switch (action.type) {
        case SEARCH_SUCCESS:
            return Object.assign({}, state, payload);
        case SEARCH_ERROR:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

