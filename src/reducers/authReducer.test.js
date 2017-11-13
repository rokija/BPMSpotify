import authReducer from './authReducer';
import * as actionType from '../constants/actionTypes';

describe('authReducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({});
    });

    it('should handle LOG_IN_SUCCESS', () => {
        const getFeaturesAction = {
            type: actionType.LOG_IN_SUCCESS,
            payload: {
                isLogged: true
            }
        };

        expect(authReducer({}, getFeaturesAction)).toEqual({ isLogged: true });
    });

    it('should handle LOG_IN_ERROR', () => {
        const getFeaturesAction = {
            type: actionType.LOG_IN_ERROR,
            payload: { status: 401 }
        };

        expect(authReducer({}, getFeaturesAction)).toEqual({ status: 401 });
    });
});
