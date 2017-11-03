import {SEARCH_SUCCESS, SEARCH_ERROR, SET_SEARCH_TERM} from '../constants/actionTypes';

const DEFAULT_STATE = {
    searchTerm: 'ssdss'
};

export default function searchReducer(state = DEFAULT_STATE, action) {
    const {payload} = action;

    switch (action.type) {
        case SET_SEARCH_TERM:
            return Object.assign({}, state, { searchTerm: action.payload });
        case SEARCH_SUCCESS:
            return Object.assign({}, state, payload);
        case SEARCH_ERROR:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

