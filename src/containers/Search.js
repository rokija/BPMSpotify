import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getSearchResults } from '../actions/searchActions';
import '../styles/about-page.css';

class Search extends Component {
    constructor() {
        super();

        this.state = {
            term: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.props.getSearchResults(this.state.term);
        this.setState({ term: '' });
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        placeholder="Search a song"
                        value={this.state.term}
                        onChange={this.onInputChange} />
                    <button onClick={this.onFormSubmit} type="submit" >Search</button>
                </form>
            </div>
        );
    }
}


Search.propTypes = {
    dispatch: PropTypes.func,
    searchTerm: PropTypes.string,
    getSearchResults: PropTypes.func,
};

Search.contextTypes = {
    router: PropTypes.object
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getSearchResults }, dispatch);
}

export default connect(null, mapDispatchToProps)(Search);
