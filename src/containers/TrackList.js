import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import PieChart from 'react-minimal-pie-chart';
import { getAudioFeatures } from '../actions/audioActions';

export class TrackList extends Component {
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
                if(featureItem && trackItems && featureItem.id === trackItems.id) {
                    return (
                        <div className="container search-results-container" key={'trackItem-' + index}>
                            <div className="container col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="i-frame-container col-md-6 col-sm-12 col-xs-12">
                                    <iframe src={`https://open.spotify.com/embed?uri=${trackItems.uri}&theme=white`}
                                            width="350" height="80" frameBorder="0" allowTransparency="true"/>
                                </div>
                                <div className="song-data-wrapper col-md-6 col-sm-12 col-xs-12">
                                    <div className="pie-chart-container col-md-2 col-sm-2 col-xs-2 pull-right">
                                        <div className="pie-chart hidden-sm hidden-xs">
                                            <PieChart
                                                lineWidth={40}
                                                rounded={true}
                                                animate={true}
                                                data={[
                                                    { value: 100 - trackItems.popularity, color: 'transparent' },
                                                    { key: trackItems.popularity, value: trackItems.popularity, color: '#abd8c0' }
                                                ]}
                                            />
                                        </div>
                                        <span className="hidden-md hidden-lg col-sm-12 col-xs-12 bpm-number">{trackItems.popularity}%</span>
                                        <span className="col-md-12 col-sm-12 col-xs-12 pie-chart-label">popularity</span>
                                    </div>
                                    <div className="col-md-3 col-xs-3 pull-right key-container">
                                        <span className="col-md-12 col-sm-12 col-xs-12 bpm-number">{featureItem.key}</span>
                                        <span className="col-md-12 col-sm-12 col-xs-12 bpm-label">key</span>
                                    </div>
                                    <div className="col-md-3 col-xs-3 pull-right bpm-container">
                                        <span className="col-md-12 col-sm-12 col-xs-12 bpm-number">{featureItem.tempo.toFixed()}</span>
                                        <span className="col-md-12 col-sm-12 col-xs-12 bpm-label">BPM</span>
                                    </div>
                                    <div className="col-md-3 col-xs-3 pull-right duration-container">
                                        <span className="col-md-12 col-sm-12 col-xs-12 duration-number">{this.millisToMinutesAndSeconds(featureItem.duration_ms)}</span>
                                        <span className="col-md-12 col-sm-12 col-xs-12 duration-label" >duration</span>
                                    </div>
                                    <div className="col-md-1 hidden-sm hidden-xs" />
                                </div>
                            </div>
                            <div className="container col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="col-md-6 hidden-sm hidden-xs pull-left audio-preview-wrapper">
                                    <span className="col-md-2 col-lg-2 preview-track">Preview</span>
                                    <div className="col-md-10 col-lg-10 audio-preview">
                                        <audio controls>
                                            <source src={trackItems.preview_url} type="audio/mp3"/>
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                </div>
                                <div className="col-md-6 pull-right hidden-sm hidden-xs" />
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

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: bindActionCreators({ getAudioFeatures }, dispatch)
    };
}

export function mapStateToProps({ search, audioFeatures }) {
    return { search, audioFeatures };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
