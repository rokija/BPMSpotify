import {SEARCH_SUCCESS, SEARCH_ERROR, SET_SEARCH_TERM} from '../constants/actionTypes';


export default function searchReducer(state = [], action) {
    const {payload} = action;

    switch (action.type) {
        case SET_SEARCH_TERM:
            // console.log([ action.payload.data, ...state ])
            return [ action.payload.data, ...state ];
        case SEARCH_SUCCESS:
            return Object.assign({}, state, payload);
        case SEARCH_ERROR:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}

