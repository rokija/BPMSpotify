import React from 'react';
import { shallow } from 'enzyme';
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
});