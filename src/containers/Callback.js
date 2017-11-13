import { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAuth, validateCallbackResult } from '../actions/authActions';

export class Callback extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(validateCallbackResult(location.hash));
    }

    componentWillReceiveProps(nextProps) {
        const {authReducer} = nextProps;
        if(authReducer.isLogged) {
            this.context.router.history.push("/search");
            return true;
        }
    }

    render() {
        return null;
    }
}

Callback.propTypes = {
    dispatch: PropTypes.func,
    authReducer: PropTypes.object,
    userLoginState: PropTypes.object
};

Callback.contextTypes = {
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
        actions: bindActionCreators({getAuth, validateCallbackResult}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
