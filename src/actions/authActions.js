import axios from 'axios';
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
    redirect_uri: 'http://localhost:3000/callback'
};

// let url = `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=code&redirect_uri=${redirect_url}&scope=user-read-private%20user-read-email&state=34fFs29kd09&${scopes}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_url)}`
//
// export function getAuth() {
//     return function (dispatch) {
//             axios({
//                 url: url,
//                 method: 'get'
//             }).then((response) => {
//                 window.location.href = response.config.url;
//                 debugger
//                 console.log(response);
//                 debugger
//                 dispatch(logInSucc(response, types.LOG_IN_SUCCESS));
//             }).catch((error) => {
//                 console.log(error)
//                 dispatch(Error(error, types.LOG_IN_ERROR));
//             });
//             // console.log(url)
//             // window.location.href = url;
//     }
// }


export function getAuth() {
        return function (dispatch) {
            client.login().then((url) => {
            window.location.href = url;
              axios({
                    url,
                  method: 'get'
        }).then((response) => {
            // console.log(response);
            dispatch(logInSucc(response, types.LOG_IN_SUCCESS));
        }).catch((error) => {
            // console.log(error)
            dispatch(Error(error, types.LOG_IN_ERROR));
        });
        });
    };
}


export function logInSucc(response) {
    return {
        type: types.LOG_IN_SUCCESS,
        payload: response
    };
}

export function Error(error) {
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
    // let tokenData = Storage.getItem(types.ACCESS_TOKEN),
        request;

    // if(tokenData){
    //     tokenData = JSON.parse(tokenData);
    // }

    // let requestBody = "token=" + tokenData.access_token;

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
            // console.log(response);
            dispatch(getUserDataSuccess(response, types.USER_DATA));
        }).catch((error) => {
            // console.log(error)
            dispatch(getUserDataError(error, types.USER_DATA_ERROR));
        });
    };
}
