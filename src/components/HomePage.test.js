import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';
import toJson from 'enzyme-to-json';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const context = { router: { history: [] } };

describe('HomePage', () => {
    it('renders properly if token is set', () => {
        cookies.set('token', 'dfsaasd', { path: '/' });
        const wrapper = shallow(<HomePage />, { context });
        expect(wrapper.length).toEqual(1);
    });

    it('renders properly if token is not set', () => {
        cookies.set('token', '', { path: '/' });
        const wrapper = shallow(<HomePage />, { context });
        expect(wrapper.length).toEqual(1);
    });

    it('matches snapshot', () => {
        const wrapper = shallow(<HomePage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
