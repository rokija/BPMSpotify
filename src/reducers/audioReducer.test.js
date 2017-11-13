import audioReducer from './audioReducer';
import * as actionType from '../constants/actionTypes';
import audioFeaturesData from '../../_mocks_/_mockdata_/audioFeaturesData';

describe('audioReducer', () => {
    it('should return the initial state', () => {
        expect(audioReducer(undefined, {})).toEqual({});
    });

    it('should handle GET_FEATURES', () => {
        const getFeaturesAction = {
            type: actionType.GET_FEATURES,
            payload: {
                data: audioFeaturesData
            }
        };

        expect(audioReducer({}, getFeaturesAction)).toEqual(audioFeaturesData);
    });

    it('should handle GET_FEATURES_ERROR', () => {
        const getFeaturesAction = {
            type: actionType.GET_FEATURES_ERROR,
            payload: { status: 500 }
        };

        expect(audioReducer({}, getFeaturesAction)).toEqual({ status: 500 });
    });
});
