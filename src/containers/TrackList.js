import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getAudioFeatures } from '../actions/audioActions';

class TrackList extends Component {
    constructor() {
        super();

        this.state = {
            searchQuery: '',
            searchResults: [],
            searchResultIds: []
        };
    }

    componentWillReceiveProps(nextProps){
        const {dispatch, search, searchQuery} = nextProps;
        let trackItems = Object.keys(search).length ? search.tracks.items : [];
        
        if(trackItems.length && searchQuery !== this.state.searchQuery && !this.compareTwo(trackItems, this.state.searchResults)) {
            
            let ids = [],
                objArr = [];
            for ( let i = 0, ilen = trackItems.length; i < ilen; i++) {
                ids.push(trackItems[i].id);
                objArr.push({id: trackItems[i].id, name: trackItems[i].name});
            }
            dispatch(getAudioFeatures(ids));
            this.setState({
                searchQuery: searchQuery,
                searchResultIds: objArr,
                searchResults: trackItems
            });
        }
    }

    compareTwo(obj1, obj2) {
        let a = JSON.stringify(obj1);
        let b = JSON.stringify(obj2);

        return a === b;
    }

    render() {
        const { search, audioFeatures } = this.props;
        const audioFeaturesList = Object.keys(audioFeatures).length ? audioFeatures.audio_features : [];
        const trackItems = Object.keys(search).length ? search.tracks.items : [];

        let renderItems = audioFeaturesList.map((featureItem) => {
            return trackItems.map((trackItems,index) => {
                if(featureItem.id === trackItems.id) {
                    return (
                        <tr key={'trackItem-' + index}>
                            <th>{trackItems.name}</th>
                            <th>{featureItem.tempo}</th>
                        </tr>
                    );
                }
            });
        });

        return (
            <table className="table table-hover">
                <thead>
                {renderItems}
                </thead>
                <tbody />
            </table>
        );
    }
}

TrackList.propTypes = {
    search: PropTypes.object,
    audioFeatures: PropTypes.object,
    getAudioFeatures: PropTypes.func,
    dispatch: PropTypes.func,
    searchQuery: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators({ getAudioFeatures }, dispatch)
    };
}

function mapStateToProps({ search, audioFeatures }) {
    return { search, audioFeatures };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);