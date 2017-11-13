import React from 'react';
import { shallow, mount } from 'enzyme';
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

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('calls typeof mapStateToProps', () => {
        expect(mapStateToProps({ search: {}, audioFeatures: {} })).toEqual({ audioFeatures: {}, search: {}});
    });

    it('calls typeof mapDispatchToProps', () => {
        expect(typeof (mapDispatchToProps())).toEqual("object");
    });

    describe('testing with shallow wrapper', () => {
        const wrapper = shallow(<TrackList {...minProps} />);
        const wrapperInstance = wrapper.instance();

        it('calls componentWillReceiveProps', () => {
            wrapperInstance.componentWillReceiveProps(minProps);
        });

        it('matches snapshot', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
