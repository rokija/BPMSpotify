import axios from 'axios';
import * as types from '../constants/actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getAudioSuccess(data) {
    return {
        type: types.GET_FEATURES,
        payload: data
    };
}

export function getAudioError(error) {
    return {
        type: types.GET_FEATURES_ERROR,
        error
    };
}

export function getAudioFeatures(ids){
    let tokenData = cookies.get('token'),
        request;

    request = axios({
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + tokenData,
            'Accept':'application/json',
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: `https://api.spotify.com/v1/audio-features/?ids=${ids}`
    });

    return (dispatch) => {
        return request.then((response) => {
            dispatch(getAudioSuccess(response, types.GET_FEATURES));
        }).catch((error) => {
            dispatch(getAudioError(error, types.GET_FEATURES_ERROR));
        });
    };
}
