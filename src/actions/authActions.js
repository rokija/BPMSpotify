import axios from 'axios';
import * as types from '../constants/actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

import { Client } from 'spotify-sdk';

let client = Client.instance;

// const client_id = 'fedf859105a2482d8cfb9c2347a9305c';
// const redirect_url = 'http://localhost:3000/callback';
// const scopes = ['user-follow-modify user-follow-read user-library-read user-top-read user-read-private user-read-email'];

client.settings = {
    clientId: 'fedf859105a2482d8cfb9c2347a9305c',
    response_type: 'code',
    secretId: 'b0e450f938b144a9a21d6d1c3f5ec326',
    scopes: ['user-follow-modify user-follow-read user-library-read user-top-read user-read-private user-read-email'],
    redirect_uri: 'http://localhost:3000/callback'
};

// let url = `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${redirect_url}&scope=${scopes}&state=34fFs29kd09&&redirect_uri=${redirect_url}`;
//
// export function getAuth() {
//     return function (dispatch) {
//             axios({
//                 url: url,
//                 headers: {
//                     'Access-Control-Allow-Origin': '*',
//                 },
//                 method: 'get'
//             }).then((response) => {
//                 dispatch(logInSuccess(response, types.LOG_IN_SUCCESS));
//                 window.location.href = response.config.url;
//             }).catch((error) => {
//                 dispatch(loginError(error, types.LOG_IN_ERROR));
//             });
//     };
// }


export function getAuth() {
        return function (dispatch) {
            client.login().then((url) => {
            window.location.href = url;
              axios({
                  url,
                  method: 'get'
            }).then((response) => {
                dispatch(logInSuccess(response, types.LOG_IN_SUCCESS));
            }).catch((error) => {
                dispatch(loginError(error, types.LOG_IN_ERROR));
            });
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
        error
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
