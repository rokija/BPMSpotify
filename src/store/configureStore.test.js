import configureStore, { configureStoreProd } from './configureStore';

describe('configureStore', () => {
    it('returns initial State for configureStoreDev', () => {
        const store = configureStore();
        expect(store.getState()).toEqual({"audioFeatures": {}, "authReducer": {}, "routing": {"location": null}, "search": {}});
    });

    it('returns initial State for configureStoreProd', () => {
        const store = configureStoreProd();
        expect(store.getState()).toEqual({"audioFeatures": {}, "authReducer": {}, "routing": {"location": null}, "search": {}});
        expect(store.getState()).toMatchSnapshot();
    });
});