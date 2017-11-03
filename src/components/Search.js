import React, { Component } from 'react';
import Searchbar from '../containers/SearchBar';
import TrackList from '../containers/TrackList';

export default class Search extends Component {
    render() {
        return (
            <div>
                <Searchbar/>
                <TrackList/>
            </div>
        );
    }
}