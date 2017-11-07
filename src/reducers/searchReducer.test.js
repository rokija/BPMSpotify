import searchReducer from './searchReducer';
import * as actionType from '../constants/actionTypes';
import searchResultsData from '../../_mocks_/_mockdata_/searchResultsData';

describe('searchReducer', () => {
    it('should return the initial state', () => {
        expect(searchReducer(undefined, {})).toEqual({});
    });

    it('should handle SET_SEARCH_TERM', () => {
        const getFeaturesAction = {
            type: actionType.SET_SEARCH_TERM,
            payload: {
                data: searchResultsData
            }
        };

        expect(searchReducer({}, getFeaturesAction)).toEqual(searchResultsData);
    });

    it('should handle SEARCH_ERROR', () => {
        const getFeaturesAction = {
            type: actionType.SEARCH_ERROR,
            payload: { status: 500 }
        };

        expect(searchReducer({}, getFeaturesAction)).toEqual({ status: 500 });
    });
});