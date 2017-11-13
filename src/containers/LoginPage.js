import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getAuth } from '../actions/authActions';

export class LoginPage extends Component {
    constructor() {
        super();

        this.logIn = this.logIn.bind(this);
    }

    componentWillMount() {
        const {authReducer } = this.props;
        if (authReducer.isLogged) {
            this.context.router.history.push("/");
        }
        else {
            this.context.router.history.push("/login");
        }
    }

    logIn() {
        this.props.dispatch(getAuth());
        return true;
    }

    render() {
        return (
            <div className="login-page-wrapper">
                <h2>Please Log in with <div className="spotify-icon-black" /></h2>
                <button className="login-button" onClick={() => this.logIn()}>Log in</button>
            </div>
        );
    }
}

LoginPage.propTypes = {
    dispatch: PropTypes.func,
    authReducer: PropTypes.object,
    userLoginState: PropTypes.object
};

LoginPage.contextTypes = {
    router: PropTypes.object
};

export function mapStateToProps (state) {
    const {authReducer} = state;
    return {
        authReducer
    };
}
export function mapDispatchToProps (dispatch) {
    return {
        dispatch,
        actions: bindActionCreators({getAuth}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
