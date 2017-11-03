import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class HomePage extends Component {

    componentWillMount() {
        let tokenData = cookies.get('token');

        if (tokenData) {
            // this.context.router.history.push("/");
            return true;
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


HomePage.contextTypes = {
    router: PropTypes.object
};

export default HomePage;


