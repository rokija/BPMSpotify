import React, { Component } from 'react';
import Searchbar from '../containers/SearchBar';
import TrackList from '../containers/TrackList';

export default class Search extends Component {
    constructor(){
        super();

        this.setSearchQuery = this.setSearchQuery.bind(this);
        this.state = {
            searchQuery: ''
        };
    }

    setSearchQuery (searchQueryValue) {
        this.setState({
            searchQuery: searchQueryValue
        });
    }

    render() {
        return (
            <div className="search-page">
                <Searchbar setSearchQuery={this.setSearchQuery} />
                <TrackList searchQuery={this.state.searchQuery}/>
            </div>
        );
    }
}