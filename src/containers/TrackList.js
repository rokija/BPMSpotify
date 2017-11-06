import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {PieChart} from 'react-easy-chart';
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

    millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {
        const { search, audioFeatures } = this.props;
        const audioFeaturesList = Object.keys(audioFeatures).length ? audioFeatures.audio_features : [];
        const trackItems = Object.keys(search).length ? search.tracks.items : [];

        let renderItems = audioFeaturesList.map((featureItem) => {
            return trackItems.map((trackItems,index) => {
                if(featureItem.id === trackItems.id) {
                    return (
                        <div className="container search-results-container" key={'trackItem-' + index}>
                            <div>
                                <div className="col-md-8">
                                    <iframe src={`https://open.spotify.com/embed?uri=${trackItems.uri}&theme=white`}
                                            width="350" height="80" frameBorder="0" allowTransparency="true"/>
                                </div>
                                <div className="col-md-1 pull-right">
                                    <PieChart
                                        size={100}
                                        innerHoleSize={50}
                                        data={[
                                            { value: trackItems.popularity, color: 'blue' },
                                            { value: 100 - trackItems.popularity, color: 'transparent', stroke: 'none'}
                                        ]}
                                    />
                                    <span className="col-md-12 bpm-label">popularity</span>
                                </div>
                                <div className="col-md-1 pull-right">
                                    <span className="col-md-12 bpm-number">{featureItem.key}</span>
                                    <span className="col-md-12 bpm-label">key</span>
                                </div>
                                <div className="col-md-1 pull-right">
                                    <span className="col-md-12 bpm-number">{featureItem.tempo.toFixed()}</span>
                                    <span className="col-md-12 bpm-label">BPM</span>
                                </div>
                                <div className="col-md-1 pull-right">
                                    <span className="col-md-12 duration-number">{this.millisToMinutesAndSeconds(featureItem.duration_ms)}</span>
                                    <span className="col-md-12 duration-label" >duration</span>
                                </div>
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <span>Preview</span>
                                    <audio controls>
                                        <source src={trackItems.preview_url} type="audio/mp3"/>
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        });

        return (
            <div>
                {renderItems}
            </div>
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