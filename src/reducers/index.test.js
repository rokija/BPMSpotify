import rootReducer from './index';

describe('rootReducer', () => {
    it('returns rootReducer as type function', () => {
        expect(typeof (rootReducer)).toEqual("function");
    });
});