import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getAuth } from '../actions/authActions';

let lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 20;

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

    mouseOverAnimation(e) {
        function moveBackground() {
            x += (lFollowX - x) * friction;
            y += (lFollowY - y) * friction;
            const background = document.getElementsByClassName("background-image-login-page")[0];
            background.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(1.2)';
            window.requestAnimationFrame(moveBackground);
        }

        let lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
        let lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
        lFollowX = (20 * lMouseX) / 100;
        lFollowY = (10 * lMouseY) / 100;

        if (window.innerWidth > 1118) {
            moveBackground();
            return true;
        }
    }

    render() {
        return (
            <div className="login-page-wrapper">
                <div className="background-image-login-page" onMouseMove={(e) => this.mouseOverAnimation(e)} />
                <div className="login-button-label-wrapper" onMouseMove={(e) => this.mouseOverAnimation(e)}>
                    <h2>Please Log in with</h2>
                    <div className="spotify-icon-black" />
                    <button className="login-button" onClick={() => this.logIn()}>Log in</button>
                </div>
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
