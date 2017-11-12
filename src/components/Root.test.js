import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Root from './Root';

describe('Root', () => {
    const initProps = {
        store: {},
        history: {}
    };
    const wrapper = shallow(<Root {...initProps} />);

    it('renders Root component with pathname editProfile', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('matches snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
