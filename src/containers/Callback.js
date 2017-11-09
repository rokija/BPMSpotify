import { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAuth, validateCallbackResult } from '../actions/authActions';

export class Callback extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        const {dispatch} = this.props;

        dispatch(validateCallbackResult(location.hash));
    }

    componentWillReceiveProps(nextProps) {
        const {authReducer} = nextProps;
        // dispatch(getUserData());
        if(!authReducer || Object.keys(authReducer).length === 0 && authReducer.constructor === Object){
             // console.log("NOTT")
            // return null;
        }

        if(authReducer.isLogged) {
            this.context.router.history.push("/search");
            return true;
        } else {
            // console.log("errrr")
            // this.context.router.push("/errorPage");
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
