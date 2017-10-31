import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HomePage extends Component {

    componentWillMount() {
        const {authReducer } = this.props;
        if (authReducer.isLogged) {
            // this.context.router.history.push("/");
        }
        else {
            this.context.router.history.push("/login");
        }
    }

    render() {
        return (
            <div>
                <h2>Helloo</h2>
            </div>
        );
    }
}


HomePage.propTypes = {
    dispatch: PropTypes.func,
    authReducer: PropTypes.func,
    userLoginState: PropTypes.object
};

HomePage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps (state) {
    const {authReducer} = state;
    return {
        authReducer
    };
}

export default connect(mapStateToProps, null)(HomePage);


