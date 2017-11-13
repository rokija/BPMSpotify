import { GET_FEATURES, GET_FEATURES_ERROR } from '../constants/actionTypes';

export default function audioReducer(state = {}, action) {
    const {payload} = action;

    switch (action.type) {
        case GET_FEATURES:
            return Object.assign({}, state, action.payload.data);
        case GET_FEATURES_ERROR:
            return Object.assign({}, state, payload);
        default:
            return state;
    }
}
