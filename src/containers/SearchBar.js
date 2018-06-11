import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { getSearchResults } from '../actions/searchActions';
// import Child from './Child';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export class SearchBar extends Component {
    state = {
        term: '',
        errorMessage: ''
    };

    componentWillMount() {
        const tokenData = cookies.get('token');

        if (tokenData) {
            return true;
        }
        else {
            this.context.router.history.push("/login");
        }
    }

    onInputChange = event => this.setState({ term: event.target.value, errorMessage: '' });

    onFormSubmit = (event) => {
        const {getSearchResults, setSearchQuery} = this.props;
        event.preventDefault();

        if (this.state.term !== '') {
            getSearchResults(this.state.term);
            setSearchQuery(this.state.term);
            this.setState({ term: '' });
        }
        else {
            this.setState({ errorMessage: 'please write a song or an artist name in the search box' });
        }
    }

    callback = val => val + 2;
    
    method = val => this.callback(val);

    render() {
        return (
            <div className="search-bar-wrapper">
                <form className="col-md-12 col-xs-12 search-input-wrapper">
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
                <span className="col-md-12 col-xs-12 error-message-input">{this.state.errorMessage}</span>
                {/* <Child /> */}
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

export const mapDispatchToProps = (dispatch) => bindActionCreators({ getSearchResults }, dispatch);

export default connect(null, mapDispatchToProps)(SearchBar);
