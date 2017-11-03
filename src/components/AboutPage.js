import React, { Component } from 'react';
import PropTypes from "prop-types";
import Cookies from 'universal-cookie';
import '../styles/about-page.css';
const cookies = new Cookies();

class AboutPage extends Component {
    constructor() {
        super();

    }

    componentWillMount() {
        const tokenData = cookies.get('token');

        if (tokenData) {
            // this.context.router.history.push("/");
        }
        else {
            this.context.router.history.push("/login");
        }
    }


    render() {
        return (
            <div>
             <h2>Test about page </h2>
            </div>
        );
    }
}


AboutPage.contextTypes = {
    router: PropTypes.object
};


export default AboutPage;
