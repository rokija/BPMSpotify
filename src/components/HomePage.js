import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class HomePage extends Component {

    componentWillMount() {
        const tokenData = cookies.get('token');

        if (tokenData) {
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


