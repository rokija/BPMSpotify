import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './authActions';
// import * as types from '../constants/actionTypes';
import authResponse from '../../_mocks_/_mockdata_/authResponse';

const mockStore = configureMockStore([thunk]);
let mock = new MockAdapter(axios);

const store = mockStore({});
const client_id = 'fedf859105a2482d8cfb9c2347a9305c';
const redirect_url = 'http://localhost:3000/callback';
const scopes = ['user-follow-modify user-follow-read user-library-read user-top-read user-read-private user-read-email'];

let url = `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${redirect_url}&scope=${scopes}&state=34fFs29kd09&&redirect_uri=${redirect_url}`;

describe('searchActions', () => {
    afterEach(() => {
        mock.reset();
    });

    it('returns search Results', () => {

        mock.onGet(url).reply(200, authResponse);

         store.dispatch(actions.getAuth());
         // expect(store.dispatch(actions.getAuth())).toEqual([]);
            // .then(() => {
            //     const expectedActions = store.getActions();
            //     expect(expectedActions.length).toBe(1);
            //     // expect(expectedActions).toEqual([{type: types.SET_SEARCH_TERM, payload: {data: searchResultsActionData, "status": 200 }}]);
            // }).catch(() => {});
    });

    it('returns search Results', () => {
        const store = mockStore({});
        const client_id = 'fedf859105a2482d8cfb9c2347a9305c';
        const redirect_url = 'http://localhost:3000/callback';
        const scopes = ['user-follow-modify user-follow-read user-library-read user-top-read user-read-private user-read-email'];

        let url = `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${redirect_url}&scope=${scopes}&state=34fFs29kd09&&redirect_uri=${redirect_url}`;

        mock.onGet(url).reply(500);

        return store.dispatch(actions.getAuth());
    });

});