import axios from "axios";
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILUER,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAILUER,
    USERLIST_LOADING,
    USERLIST_SUCCESS,
    USERLIST_FAILUER,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAILUER,
    LOGOUT_SUCCESS,
    LOGOUT_FAILUER
} from '../actions/constants';
import { SERVERURL } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
//import { error } from "react-native-gifted-chat/lib/utils";

export function loginLOADING() {
    return {
        type: LOGIN_LOADING,
    };
}
export function loginSUCCESS(payload) {
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    };
}
export function loginFAILUER(payload) {
    return {
        type: LOGIN_FAILUER,
        payload: payload
    };
}
export function userLogin(userinfo) {
    const data = userinfo;
    return (dispatch) => {
        dispatch(loginLOADING());
        axios({
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            url: `${SERVERURL}loginuser`,
            crossDomain: true,
            data,
        }).then((res) => {
            if (res.status === 200) {
                const usercredentials = JSON.stringify(res.data);
                AsyncStorage.setItem('usercredentials', usercredentials);
                dispatch(loginSUCCESS(res.data));
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                dispatch(loginFAILUER(error.response));
            }
        });
    };
}

export function registerLOADING() {
    return {
        type: REGISTER_LOADING,
    };
}
export function registerSUCCESS(payload) {
    return {
        type: REGISTER_SUCCESS,
        payload: payload
    };
}
export function registerFAILUER(payload) {
    return {
        type: REGISTER_FAILUER,
        payload: payload
    };
}
export function userRegister(userinfo) {
    const data = userinfo;
    return (dispatch) => {
        dispatch(registerLOADING());
        axios({
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            url: `${SERVERURL}registeruser`,
            crossDomain: true,
            data,
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                const usercredentials = JSON.stringify(res.data);
                AsyncStorage.setItem('usercredentials', usercredentials);
                dispatch(registerSUCCESS(res.data));
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                //console.log(error)
                dispatch(registerFAILUER(error.response));
            }
        });
    };
}

export function userListLOADING() {
    return {
        type: USERLIST_LOADING,
    };
}
export function userListSUCCESS(payload) {
    return {
        type: USERLIST_SUCCESS,
        payload: payload
    };
}
export function userListFAILUER(payload) {
    return {
        type: USERLIST_FAILUER,
        payload: payload
    };
}
export function userList() {
    return (dispatch) => {
        dispatch(userListLOADING());
        axios({
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            url: `${SERVERURL}userlist`,
            crossDomain: true,
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                dispatch(userListSUCCESS(res.data));
            }
        }).catch((error) => {
            if (error.response.status === 400) {
           dispatch(userListFAILUER(error.response));
            }
        });
    };
}

export function userAuthSUCCESS(payload) {
    return {
        type: USER_AUTH_SUCCESS,
        payload: payload
    };
}
export function userAuthFAILUER(error) {
    return {
        type: USER_AUTH_FAILUER,
        payload: error
    };
}
export function userAuth() {
    return async function (dispatch) {
        try {
            AsyncStorage.getItem('usercredentials')
            .then((value) => {
                const res = JSON.parse(value);
                dispatch(userAuthSUCCESS(res));
            });
        } catch(error) {
            dispatch(userAuthFAILUER(error))
        }
    }
}
export function logoutSUCCESS(payload) {
    return {
        type: LOGOUT_SUCCESS,
        payload: payload
    };
}
export function logoutFAILUER(error) {
    return {
        type: LOGOUT_FAILUER,
        payload: error
    };
}
export function logout() {
    return async function (dispatch) {
        try {
            AsyncStorage.getItem('usercredentials')
            .then((value) => {
                const res = JSON.parse(value);
                dispatch(logoutSUCCESS(res));
            });
        } catch(error) {
            dispatch(logoutFAILUER(error))
        }
    }
}