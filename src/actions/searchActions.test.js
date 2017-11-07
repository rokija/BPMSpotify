import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Cookies from 'universal-cookie';
import * as actions from './searchActions';
import * as types from '../constants/actionTypes';
import searchResultsActionData from '../../_mocks_/_mockdata_/searchResultsActionData';

const cookies = new Cookies();

const mockStore = configureMockStore([thunk]);
let mock = new MockAdapter(axios, { delayResponse: 2000 });


// axios.interceptors.response.use(response => {
//     const newResponse = {
//         status: response.status,
//         data: response.data
//     };
//     return newResponse;
// }, error => {
//     let newError = {
//         status: error.response.status
//     };
//     return Promise.reject(newError);
// });


describe('searchActions', () => {
    beforeAll(() => {
        cookies.set("token", 'asjkdnsajkdnlsadlksak', {
            path: '/',
        });
    });
    afterAll(() => {
        cookies.set("token", '', {
            path: '/',
        });
    });

    afterEach(() => {
        mock.reset();
    });

    it('returns search Results', () => {
        const store = mockStore({});
        const value = 'drake';

        mock.onGet(`https://api.spotify.com/v1/search?q=${value}&type=track,artist`).reply(200, searchResultsActionData);

        return store.dispatch(actions.getSearchResults(value))
            .then(() => {
                const expectedActions = store.getActions();
                expect(expectedActions.length).toBe(1);
                expect(expectedActions).toEqual([{type: types.SET_SEARCH_TERM, payload: {data: searchResultsActionData, "status": 200 }}]);
            }).catch(() => {});
    });

    it('returns error', () => {
        const store = mockStore({});
        const value = 'drake';

        mock.onGet(`https://api.spotify.com/v1/search?q=${value}&type=track,artist`).reply(400);

        return store.dispatch(actions.getSearchResults(value))
            .then(() => {
                const expectedActions = store.getActions();
                expect(expectedActions.length).toBe(1);
                expect(expectedActions).toEqual([{"error": {"status": 400}, "type": "SEARCH_ERROR"}]);
            }).catch(() => {});
    });
});