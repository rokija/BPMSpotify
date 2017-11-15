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

    it('should create an action creator logInSuccess', () => {
        const payload = 'response';
        const actionType = types.LOG_IN_SUCCESS;
        const expectedAction = {
            type: types.LOG_IN_SUCCESS,
            payload
        };
        expect(actions.logInSuccess(payload, actionType)).toEqual(expectedAction);
    });

    it('should create an action creator loginError', () => {
        const payload = 'error';
        const actionType = types.LOG_IN_ERROR;
        const expectedAction = {
            type: types.LOG_IN_ERROR,
            payload
        };
        expect(actions.loginError(payload, actionType)).toEqual(expectedAction);

    });

    it('should call function getAuth with login success', () => {
        expect(typeof (actions.getAuth())).toEqual("function");

        const dispatch = jest.fn();
        const expected = {
            payload: "https://accounts.spotify.com/en/authorize?response_type=token&client_id=fedf859105a2482d8cfb9c2347a9305c&redirect_uri=https%3A%2F%2Fspotify-song-data.firebaseapp.com%2Fcallback&scope=user-follow-modify%20user-follow-read%20user-library-read%20user-top-read%20user-read-private%20user-read-email",
            type: types.LOG_IN_SUCCESS
        };
        return actions.getAuth()(dispatch).then(() => {
            expect(dispatch).toBeCalledWith(expected);
        });
    });

    it('should call function validateCallbackResult with login success', () => {
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

    it('should call function validateCallbackResult with login error', () => {
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
