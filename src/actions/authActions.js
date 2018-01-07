import * as types from '../constants/actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

import { Client } from 'spotify-sdk';

let client = Client.instance;

client.settings = {
    clientId: 'fedf859105a2482d8cfb9c2347a9305c',
    response_type: 'code',
    secretId: 'b0e450f938b144a9a21d6d1c3f5ec326',
    scopes: ['user-follow-modify user-follow-read user-library-read user-top-read user-read-private user-read-email'],
    redirect_uri: 'https://spotify-song-data.firebaseapp.com/callback'
};

export function getAuth() {
    return getAuthResponse(client.login());
}

export function getAuthResponse(request) {
    return (dispatch) => {
        return request.then((url) => {
            dispatch(logInSuccess(url, types.LOG_IN_SUCCESS));
            window.location.href = url;
        }).catch((error) => {
            dispatch(loginError(error, types.LOG_IN_ERROR));
        });
    };
}

export function logInSuccess(response) {
    return {
        type: types.LOG_IN_SUCCESS,
        payload: response
    };
}

export function loginError(error) {
    return {
        type: types.LOG_IN_ERROR,
        payload: error
    };
}

export function validateCallbackResult(locationHash){
    return (dispatch) => {
        let currentLocationHash = locationHash,
            modifiedHash = currentLocationHash.replace("#",""),
            splitHash = modifiedHash.split("&");

        if(splitHash[0].indexOf("error=") !== -1){
            return dispatch({
                type: types.LOG_IN_ERROR,
                payload: {
                    isLogged: false
                }
            });
        }

        if(splitHash[0].indexOf("access_token=") !== -1){
            for(let i = 0, ilen = splitHash.length; i < ilen; i++){
                let splitValue = splitHash[i].split("=");

                if(splitValue[0] === "access_token") {
                    cookies.set("token", splitValue[1], {
                        path: '/',
                        maxAge: 3600
                    });
                }
            }
            return dispatch({
                type: types.LOG_IN_SUCCESS,
                payload: {
                    isLogged: true
                }
            });
        }
    };
}
