import axios from 'axios';
import * as types from '../constants/actionTypes';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

let token_ttl = "900000";

//TODO: save token in cookies

import {Client} from 'spotify-sdk';

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
            splitHash = modifiedHash.split("&"),
            tokenStorage = {},
            dateNow = Date.now(),
            expires_in,
            iterations = 0;

        if(splitHash[0].indexOf("error=") !== -1){
            return dispatch({
                type: types.LOG_IN_ERROR,
                payload: {
                    isLogged: false
                }
            });
        }

        if(splitHash[0].indexOf("access_token=") !== -1){
            //for (const value of splitHash){
            for(let i = 0, ilen = splitHash.length; i < ilen; i++){
                let splitValue = splitHash[i].split("=");

                if(splitValue[0] === "expires_in"){
                    splitValue[1] = +splitValue[1];
                    expires_in = token_ttl && token_ttl.length ? token_ttl : splitValue[1] * 1000;
                    tokenStorage.expires_in = +expires_in;

                    //Delete token after expires_in time
                    let deleteTokenTimeout = setTimeout(function(){
                        cookies.set('token', '', { path: '/' });
                        clearTimeout(deleteTokenTimeout);
                    }, tokenStorage.expires_in);

                    tokenStorage[splitValue[0]] = expires_in;
                } else {
                    tokenStorage[splitValue[0]] = splitValue[1];
                }
                ++iterations;
            }

            if(iterations === splitHash.length){
                if(!tokenStorage.expiry_time){
                    tokenStorage.expiry_time = dateNow + Number(tokenStorage.expires_in);
                }
                tokenStorage = JSON.stringify(tokenStorage);
                // Storage.setItem("access_token", tokenStorage);

                cookies.set("access_token", tokenStorage, {
                    path: '/',
                    expires: tokenStorage.expiry_time
                });
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
    let tokenData = cookies.get('access_token'),
    // let tokenData = Storage.getItem(types.ACCESS_TOKEN),
        request;
    // if(tokenData){
    //     tokenData = JSON.parse(tokenData);
    // }

    // let requestBody = "token=" + tokenData.access_token;

    request = axios({
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + tokenData.access_token,
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
