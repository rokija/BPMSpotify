import React from 'react';
import { shallow } from 'enzyme';
import { Callback, mapStateToProps, mapDispatchToProps } from './Callback';

const context = { router: { history: [] }  };

const minProps = {
    dispatch: jest.fn(),
    authReducer: { isLogged: true }
};

describe('Callback', () => {
    const wrapper = shallow(<Callback {...minProps} />, { context });
    const wrapperInstance = wrapper.instance();

    it('renders properly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('should call componentWillReceiveProps', () => {
        const spy = jest.spyOn(wrapperInstance, 'componentWillReceiveProps');
        wrapper.setProps({ authReducer: { isLogged: true } });
        expect(spy).toHaveBeenCalled();
    });

    it('calls mapStateToProps', () => {
        expect(mapStateToProps({ authReducer: { isLogged: true }})).toEqual({ authReducer: { isLogged: true }});
    });

    it('calls typeof mapDispatchToProps', () => {
        expect(typeof (mapDispatchToProps())).toEqual("object");
    });
});
