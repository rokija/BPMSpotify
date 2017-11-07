import React from 'react';
import { shallow } from 'enzyme';
import BeforeTrackList from './BeforeTrackList';

describe('BeforeTrackList', () => {
    const wrapper = shallow(<BeforeTrackList />);

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });
});