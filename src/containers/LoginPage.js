import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from "prop-types";
import { getAuth } from '../actions/authActions';

export const calculateBackgroundPosition = ({ clientX, clientY },x,y) => {
    let lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - clientX));
    let lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - clientY));
    const lFollowX = (30 * lMouseX) / 100;
    const lFollowY = (20 * lMouseY) / 100;
    const friction = 1 / 2;

    const calculatedX = (lFollowX - x) * friction;
    const calculatedY = (lFollowY - y) * friction;

    return { x: calculatedX, y: calculatedY };
};

const TABLET_SIZE = 1118;

export class LoginPage extends Component {
    state = {
        x: 0,
        y: 0
    };

    componentWillMount() {
        const { authReducer, goHome, goLoginPage } = this.props;
        if (authReducer.isLogged) {
            goHome();
        }
        else {
            goLoginPage();
        }
    }

    mouseOverAnimation = (e) => {
        const { x, y } = this.state;
        if (window.innerWidth > TABLET_SIZE) {
            this.setState(calculateBackgroundPosition(e,x,y));
        }
    };

    render() {
        const { x, y } = this.state;
        const { getAuth } = this.props;
        return (
            <div className="login-page-wrapper">
                <div className="background-image-login-page" onMouseMove={this.mouseOverAnimation} style={{ transform: `translate(${x}px, ${y}px) scale(1.2)`}} />
                <div className="login-button-label-wrapper" onMouseMove={this.mouseOverAnimation}>
                    <h2>Please Log in with</h2>
                    <div className="spotify-icon-black" />
                    <button className="login-button" onClick={getAuth}>Log in</button>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    dispatch: PropTypes.func,
    authReducer: PropTypes.object,
    userLoginState: PropTypes.object,
    getAuth: PropTypes.func,
    goHome: PropTypes.func,
    goLoginPage: PropTypes.func,
};

LoginPage.contextTypes = {
    router: PropTypes.object
};

export const mapStateToProps = ({ authReducer }) => ({
    authReducer,
});


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
    getAuth: () => dispatch(getAuth()),
    goHome: () => dispatch(push("/")),
    goLoginPage: () => dispatch(push("/login")),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
