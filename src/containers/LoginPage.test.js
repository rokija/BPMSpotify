import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { LoginPage, mapDispatchToProps, mapStateToProps } from './LoginPage';

const context = { router: { history: [] }  };

describe('LoginPage if user is Logged in', () => {
    const minProps = {
        dispatch: jest.fn(),
        authReducer: { isLogged: true }
    };

    const wrapper = mount(<LoginPage {...minProps} />, { context });

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });
});

describe('LoginPage if user is not Logged in', () => {
    const minProps = {
        dispatch: jest.fn(),
        authReducer: { isLogged: false }
    };

    const wrapper = mount(<LoginPage {...minProps} />, { context });

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('calls logIn function', () => {
        wrapper.find('button').simulate('click');
    });

    it('calls mapStateToProps', () => {
        expect(mapStateToProps({authReducer: { isLogged: true }})).toEqual({"authReducer": {"isLogged": true}});
    });

    it('calls typeof mapDispatchToProps', () => {
        expect(typeof (mapDispatchToProps())).toEqual("object");
    });
});

describe('LoginPage with shallow wrapper', () => {
    const minProps = {
        dispatch: jest.fn(),
        authReducer: { isLogged: false }
    };

    const wrapper = shallow(<LoginPage {...minProps} />, { context });
    const wrapperInstance = wrapper.instance();

    it('calls logIn', () => {
        expect(wrapperInstance.logIn()).toEqual(true);
    });

    it('matches snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});