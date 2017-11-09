import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

class HomePage extends Component {

    // componentWillMount() {
    //     const tokenData = cookies.get('token');
    //
    //     if (tokenData) {
    //         return true;
    //     }
    //     else {
    //         this.context.router.history.push("/login");
    //     }
    // }

    render() {
        return (
            <div className="home-page-wrapper">
                <div className="link-to-search-page-wrapper">
                    <h3 className="home-page-title">Get song data from spotify</h3>
                    <Link className="link-to-search-page" to="/search"><span>Enter</span></Link>
                </div>
            </div>
        );
    }
}


// HomePage.contextTypes = {
//     router: PropTypes.object
// };

export default HomePage;


