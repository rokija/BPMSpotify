import { SET_SEARCH_TERM, SEARCH_ERROR } from '../constants/actionTypes';

export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return action.payload.data;
        case SEARCH_ERROR:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

