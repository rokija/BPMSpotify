import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getSearchResults } from '../actions/searchActions';
import '../styles/about-page.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export class SearchBar extends Component {
    constructor() {
        super();

        this.state = {
            term: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillMount() {
        const tokenData = cookies.get('token');

        if (tokenData) {
            return true;
        }
        else {
            this.context.router.history.push("/login");
        }
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        const {getSearchResults, setSearchQuery} = this.props;
        event.preventDefault();

        getSearchResults(this.state.term);
        setSearchQuery(this.state.term);
        this.setState({ term: '' });
    }

    render() {
        return (
            <div>
                <form className="search-input-wrapper">
                    <input
                        className="search-input"
                        placeholder="Search a song"
                        value={this.state.term}
                        onChange={this.onInputChange} />
                    <button
                        className="search-button btn glyphicon glyphicon-search"
                        onClick={this.onFormSubmit}
                        type="submit" />
                </form>
            </div>
        );
    }
}


SearchBar.propTypes = {
    dispatch: PropTypes.func,
    searchTerm: PropTypes.string,
    getSearchResults: PropTypes.func,
    setSearchQuery: PropTypes.func,
};

SearchBar.contextTypes = {
    router: PropTypes.object
};


export function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getSearchResults }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
