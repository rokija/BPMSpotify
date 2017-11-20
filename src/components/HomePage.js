import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render() {
        return (
            <div className="home-page-wrapper">
                <div className="link-to-search-page-wrapper">
                    <h3 className="home-page-title">Get song data from spotify</h3>
                    <Link className="link-to-search-page" to="/search">Enter</Link>
                </div>
            </div>
        );
    }
}

export default HomePage;
