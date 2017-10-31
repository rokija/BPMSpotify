import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getAuth } from '../actions/authActions';
import '../styles/about-page.css';

class LoginPage extends Component {
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

    logIn = () => {
        this.props.dispatch(getAuth());
    }

    render() {
        return (
            <div>
                <h2 className="alt-header">Please Log in</h2>
                <p>
                    <button onClick={() => this.logIn()}>Log in</button>
                </p>
            </div>
        );
    }
}

LoginPage.propTypes = {
    dispatch: PropTypes.func,
    authReducer: PropTypes.func,
    userLoginState: PropTypes.object
};

LoginPage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps (state) {
    const {authReducer} = state;
    return {
        authReducer
    };
}
function mapDispatchToProps (dispatch) {
    return {
        dispatch,
        actions: bindActionCreators({getAuth}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
