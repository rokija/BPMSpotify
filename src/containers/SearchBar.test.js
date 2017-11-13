import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SearchBar, mapDispatchToProps } from './SearchBar';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const context = { router: { history: [] }  };

const minProps ={
    getSearchResults: jest.fn(),
    setSearchQuery: jest.fn()
};

describe('SearchBar', () => {
    const wrapper = mount(<SearchBar {...minProps} />, { context });

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('calls typeof mapDispatchToProps', () => {
        expect(typeof (mapDispatchToProps())).toEqual("object");
    });

    it('renders properly if token is set', () => {
        cookies.set('token', 'dfsaasd', { path: '/' });
        const wrapper = shallow(<SearchBar />, { context });
        expect(wrapper.length).toEqual(1);
    });

    describe('simulating events', () => {

        it('calls onInputChange', () => {
            wrapper.find('input').simulate('change', { target: { value: 'some value' } });
        });

        it('calls onFormSubmit', () => {
            wrapper.find('button').simulate('click');
        });
    });

    describe('testing methods', () => {
        const wrapper = shallow(<SearchBar {...minProps} />, { context });
        const wrapperInstance = wrapper.instance();

        it('calls onInputChange', () => {
            wrapperInstance.onInputChange({ target: { value: 'some value' } });
            expect(wrapperInstance.state.term).toEqual('some value');
        });

        it('calls onFormSubmit', () => {
            wrapperInstance.setState({ term: 'value' });
            wrapperInstance.onFormSubmit({preventDefault: () => {}});
            expect(wrapperInstance.state.term).toEqual('');
        });

        it('calls onFormSubmit with no input value', () => {
            wrapperInstance.setState({ term: '' });
            wrapperInstance.onFormSubmit({preventDefault: () => {}});
            expect(wrapperInstance.state.term).toEqual('');
        });

        it('matches snapshot', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
