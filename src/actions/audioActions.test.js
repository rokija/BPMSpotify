import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Cookies from 'universal-cookie';
import * as actions from './audioActions';
import * as types from '../constants/actionTypes';
import audioFeaturesData from '../../_mocks_/_mockdata_/audioFeaturesData';

const cookies = new Cookies();

const mockStore = configureMockStore([thunk]);

let mock = new MockAdapter(axios, { delayResponse: 2000 });

describe('audioActions', () => {
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

    it('returns audio Features', () => {
        const store = mockStore({});
        const ids = ["55r6556", "7676678"];

        mock.onGet(`https://api.spotify.com/v1/audio-features/?ids=${ids}`).reply(200, audioFeaturesData);

        return store.dispatch(actions.getAudioFeatures(ids))
            .then(() => {
                const expectedActions = store.getActions();
                expect(expectedActions.length).toBe(1);
                expect(expectedActions).toEqual([{type: types.GET_FEATURES, payload: {data: audioFeaturesData, "status": 200 }}]);
            }).catch(() => {});
    });

    it('returns error', () => {
        const store = mockStore({});
        const ids = ["55r6556", "7676678"];

        mock.onGet(`https://api.spotify.com/v1/audio-features/?ids=${ids}`).reply(400);

        return store.dispatch(actions.getAudioFeatures(ids))
            .then(() => {
                const expectedActions = store.getActions();
                expect(expectedActions.length).toBe(1);
                expect(expectedActions).toEqual([{"error": {"status": 400}, "type": "GET_FEATURES_ERROR"}]);
            }).catch(() => {});
    });
});