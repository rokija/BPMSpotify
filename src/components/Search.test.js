import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Search from './Search';

describe('Search', () => {
    const wrapper = shallow(<Search />);

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
