import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

class TrackList extends Component {
    constructor() {
        super();
    }

    renderSongs(songData) {
        return (
          <tbody>
          <tr>
          {
                    songData.tracks.items.map(function(element) {
                        return (
                            <td key={element.id}>{element.name}</td>
                        );
                    })
            }
          </tr>
            <tr>
          {
                    songData.artists.items.map(function(element) {
                        return (
                            <td key={element.id}>{element.name}</td>
                        );
                    })
            }
            </tr>
          </tbody>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Song</th>
                        <th>BPM</th>
                    </tr>
                </thead>
                {this.props.search.map(this.renderSongs)}
            </table>
        );
    }
}

TrackList.propTypes = {
    search: PropTypes.array
};

function mapStateToProps({ search }) {
    return { search };
}

export default connect(mapStateToProps)(TrackList);