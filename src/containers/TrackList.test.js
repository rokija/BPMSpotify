import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TrackList, mapDispatchToProps, mapStateToProps } from './TrackList';
import searchResultsData from '../../_mocks_/_mockdata_/searchResultsData';
import audioFeaturesData from '../../_mocks_/_mockdata_/audioFeaturesData';

const minProps = {
    audioFeatures: audioFeaturesData,
    search: searchResultsData,
    dispatch: jest.fn(),
    searchQuery: 'q'
};

describe('TrackList', () => {
    const wrapper = mount(<TrackList {...minProps} />);
    const wrapperInstance = wrapper.instance();

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('calls typeof mapStateToProps', () => {
        expect(mapStateToProps({ search: {}, audioFeatures: {} })).toEqual({ audioFeatures: {}, search: {}});
    });

    it('calls typeof mapDispatchToProps', () => {
        expect(typeof (mapDispatchToProps())).toEqual("object");
    });

    it('should call componentWillReceiveProps', () => {
        const spy = jest.spyOn(wrapperInstance, 'componentWillReceiveProps');
        wrapper.setProps({ authReducer: { isLogged: true } });
        expect(spy).toHaveBeenCalled();
    });

    it('matches snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('testing methods', () => {
        it('calls function millisToMinutesAndSeconds with milliseconds provided', () => {
            expect(wrapperInstance.millisToMinutesAndSeconds(3600)).toEqual('0:04');
        });

        it('calls function compareTwo', () => {
            expect(wrapperInstance.compareTwo({a: 1}, {a: 1})).toEqual(true);
        });
    });
});
