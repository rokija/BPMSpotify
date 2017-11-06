import axios from 'axios';
import * as types from '../constants/actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function searchSuccess(track) {
    return {
        type: types.SET_SEARCH_TERM,
        payload: track
    };
}

export function searchError(error) {
    return {
        type: types.SEARCH_ERROR,
        error
    };
}

export function getSearchResults(value){
    let tokenData = cookies.get('token'),
        request;

    request = axios({
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + tokenData,
            'Accept':'application/json',
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: `https://api.spotify.com/v1/search?q=${value}&type=track,artist`
    });

    return (dispatch) => {
        return request.then((response) => {
            dispatch(searchSuccess(response, types.SET_SEARCH_TERM));
        }).catch((error) => {
            dispatch(searchError(error, types.SEARCH_ERROR));
        });
    };
}


