import React from 'react';
import { shallow } from 'enzyme';
import App from './App';


describe('App', () => {
    const wrapper = shallow(<App />);

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('matches snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
