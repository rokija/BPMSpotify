import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import BeforeTrackList from './BeforeTrackList';

describe('BeforeTrackList', () => {
    const wrapper = shallow(<BeforeTrackList />);

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('matches snapshot', () => {
        const tree = renderer.create(<BeforeTrackList />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
