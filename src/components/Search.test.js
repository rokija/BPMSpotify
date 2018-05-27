import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Search from './Search';

jest.mock('../containers/SearchBar');
jest.mock('../containers/TrackList');

jest.mock('./BeforeTrackList', () => {
    const BeforeTrackList = () => <div />;
    return BeforeTrackList;
});

describe('Search', () => {
    const wrapper = mount(<Search />);

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('sets Search Query', () => {
        const wrapperInstance = wrapper.instance();
        wrapperInstance.setSearchQuery('some value');
        expect(wrapperInstance.state.searchQuery).toEqual('some value');
    });

    it('matches snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
