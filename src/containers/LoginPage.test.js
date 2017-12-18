import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { LoginPage, calculateBackgroundPosition, mapStateToProps } from './LoginPage';

describe('LoginPage if user is Logged in', () => {
    const minProps = {
        dispatch: jest.fn(),
        authReducer: { isLogged: true },
        goHome: jest.fn(),
        goLoginPage: jest.fn()
    };

    const wrapper = mount(<LoginPage {...minProps} />);

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('matches snapshot', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('LoginPage if user is not Logged in', () => {
    const minProps = {
        dispatch: jest.fn(),
        authReducer: { isLogged: false },
        goHome: jest.fn(),
        goLoginPage: jest.fn(),
        getAuth: jest.fn(),
    };

    const wrapper = mount(<LoginPage {...minProps} />);
    const wrapperInstance = wrapper.instance();

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('calls mouseOverAnimation', () => {
        global.window.innerWidth = 1800;
        const spy = jest.spyOn(wrapperInstance, 'mouseOverAnimation');
        wrapper.find('.background-image-login-page').simulate('mousemove');
        wrapper.find('.login-button-label-wrapper').simulate('mousemove');
        expect(spy).toHaveBeenCalled();
    });

    it('calls calculateBackgroundPosition function with arguments', () => {
        expect(calculateBackgroundPosition({ clientX: 10, clientY: 10 },55,55)).toEqual({x: -12.5, y: -17.5});
    });

    it('calls getAuth action', () => {
        wrapper.find('button').simulate('click');
        expect(minProps.getAuth).toHaveBeenCalled();
    });

    it('calls mapStateToProps', () => {
        expect(mapStateToProps({authReducer: { isLogged: true }})).toEqual({authReducer: {isLogged: true}});
    });

    it('calls componentWillMount', () => {
        wrapper.unmount();
        jest.spyOn(LoginPage.prototype, 'componentWillMount');
        mount(<LoginPage {...minProps}/>);
        expect(LoginPage.prototype.componentWillMount).toHaveBeenCalled();
    });
});
