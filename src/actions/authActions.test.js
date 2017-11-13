import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as actions from './authActions';
import * as types from '../constants/actionTypes';

let mock = new MockAdapter(axios);

let locationHash = '#access_token=BQANdmc8r4qc1eU3d_AT4blfH3Ao9WwGQFDADfHlCDSsUGq7KGaqHyYO-M2hR1gi9IQfpY6-KXgUTPxdWrZo5xLfTlK0PmZ3GMolhREVOS__7LmZshuTW1-hRJwxfWkIws-sjSxCy2Q3AypUg6uouRt7jSHusnSsYqxRVWAUdZmEG4Wpad2Le3VqPLNzMog&token_type=Bearer&expires_in=3600';
let locationHashError = '#error=BQANdmc8r4qc1eU3d_AT4blfH3Ao9WwGQFDADfHlCDSsUGq7KGaqHyYO-M2hR1gi9IQfpY6-KXgUTPxdWrZo5xLfTlK0PmZ3GMolhREVOS__7LmZshuTW1-hRJwxfWkIws-sjSxCy2Q3AypUg6uouRt7jSHusnSsYqxRVWAUdZmEG4Wpad2Le3VqPLNzMog&token_type=Bearer&expires_in=3600';

describe('authActions', () => {
    afterEach(() => {
        mock.reset();
    });

    it('should call validateCallbackResult with login success', () => {
        expect(typeof (actions.validateCallbackResult(locationHash))).toEqual("function");

        const dispatch = jest.fn();
        const expected = {
            type: types.LOG_IN_SUCCESS,
            payload: {
                isLogged: true
            }
        };
        actions.validateCallbackResult(locationHash)(dispatch);
        expect(dispatch).toBeCalledWith(expected);
    });

    it('should call validateCallbackResult with login error', () => {
        const dispatch = jest.fn();
        const expected = {
            type: types.LOG_IN_ERROR,
            payload: {
                isLogged: false
            }
        };
        actions.validateCallbackResult(locationHashError)(dispatch);
        expect(dispatch).toBeCalledWith(expected);
    });
});
