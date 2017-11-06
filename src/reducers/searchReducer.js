import { SET_SEARCH_TERM } from '../constants/actionTypes';


export default function searchReducer(state = {}, action) {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return action.payload.data;
        default:
            return state;
    }
}

