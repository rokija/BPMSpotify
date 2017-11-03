import axios from 'axios';
import * as types from '../constants/actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


export function setSearchTerm(searchTerm) {
    return {
        type: types.SET_SEARCH_TERM,
        payload: searchTerm
    };
}

export function searchSuccess(track) {
    return {
        type: types.SEARCH_SUCCESS,
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
        url: `https://api.spotify.com/v1/search?q=${value}&type=track`
    });

    return {
        type: types.SET_SEARCH_TERM,
        payload: request
    };

    // return (dispatch) => {
    //     return request.then((response) => {
    //         console.log(response)
    //         dispatch(searchSuccess(response, types.SEARCH_SUCCESS));
    //     }).catch((error) => {
    //         dispatch(searchError(error, types.SEARCH_ERROR));
    //     });
    // };
}


export function getUserDataSuccess(response) {
    return {
        type: types.USER_DATA,
        payload: response
    };
}

export function getUserDataError(error) {
    return {
        type: types.USER_DATA_ERROR,
        error
    };
}

export function getUserData(){
    let tokenData = cookies.get('token'),
        request;

    request = axios({
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + tokenData,
            'Accept':'application/json',
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://api.spotify.com/v1/me'
    });

    return (dispatch) => {
        return request.then((response) => {
            // console.log(response)
            dispatch(getUserDataSuccess(response, types.USER_DATA));
        }).catch((error) => {
            dispatch(getUserDataError(error, types.USER_DATA_ERROR));
        });
    };
}
