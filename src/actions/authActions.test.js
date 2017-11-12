import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './authActions';
import * as types from '../constants/actionTypes';
import authResponse from '../../_mocks_/_mockdata_/authResponse';


const mockStore = configureMockStore([thunk]);
let mock = new MockAdapter(axios);

axios.interceptors.response.use(response => {
    const newResponse = response.config.url;
    return newResponse;
}, error => {
    let newError = {
        status: error.response.status
    };
    return Promise.reject(newError);
});


const client_id = 'fedf859105a2482d8cfb9c2347a9305c';
const redirect_url = 'http://localhost:3000/callback';
const scopes = ['user-follow-modify user-follow-read user-library-read user-top-read user-read-private user-read-email'];

let url = `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${redirect_url}&scope=${scopes}&state=34fFs29kd09&&redirect_uri=${redirect_url}`;

let responseUrl = 'https://accounts.spotify.com/en/authorize?response_type=token&client_id=fedf859105a2482d8cfb9c2347a9305c&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-follow-modify%20user-follow-read%20user-library-read%20user-top-read%20user-read-private%20user-read-email';
let locationHash = '#access_token=BQANdmc8r4qc1eU3d_AT4blfH3Ao9WwGQFDADfHlCDSsUGq7KGaqHyYO-M2hR1gi9IQfpY6-KXgUTPxdWrZo5xLfTlK0PmZ3GMolhREVOS__7LmZshuTW1-hRJwxfWkIws-sjSxCy2Q3AypUg6uouRt7jSHusnSsYqxRVWAUdZmEG4Wpad2Le3VqPLNzMog&token_type=Bearer&expires_in=3600';
let locationHashError = '#error=BQANdmc8r4qc1eU3d_AT4blfH3Ao9WwGQFDADfHlCDSsUGq7KGaqHyYO-M2hR1gi9IQfpY6-KXgUTPxdWrZo5xLfTlK0PmZ3GMolhREVOS__7LmZshuTW1-hRJwxfWkIws-sjSxCy2Q3AypUg6uouRt7jSHusnSsYqxRVWAUdZmEG4Wpad2Le3VqPLNzMog&token_type=Bearer&expires_in=3600';
describe('authActions', () => {
    afterEach(() => {
        mock.reset();
    });

    it('returns redirect url and redirects to login', () => {
        const store = mockStore({});
        mock.onGet(url).reply(200, responseUrl);

        return store.dispatch(actions.getAuth())
            .then(() => {
                expect(store.getActions([])).toContainEqual({type: types.LOG_IN_SUCCESS, payload: authResponse.config.url});
            });
    });

    it('returns an error', () => {
        const store = mockStore({});
        mock.onGet(url).reply(500);

        return store.dispatch(actions.getAuth())
            .then(() => {
                expect(store.getActions()).toEqual([{error: {"status": 500}, type: types.LOG_IN_ERROR}]);
            });
    });

    it('should call validateCallbackResult with login success', () => {
        // expect this to return a function since it is a thunk
        expect(typeof (actions.validateCallbackResult(locationHash))).toEqual("function");

        const dispatch = jest.fn();
        const expected = {
            type: types.LOG_IN_SUCCESS,
            payload: {
                isLogged: true
            }
        };
        // simulate calling it with dispatch as the store would do
        actions.validateCallbackResult(locationHash)(dispatch);
        // finally assert that the dispatch was called with our expected action
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