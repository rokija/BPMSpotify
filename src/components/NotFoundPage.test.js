import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
    const wrapper = shallow(<NotFoundPage />);

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('matches snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
