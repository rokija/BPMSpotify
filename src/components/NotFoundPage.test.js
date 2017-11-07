import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
    const wrapper = shallow(<NotFoundPage />);

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });
});