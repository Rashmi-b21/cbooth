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

const initialState = {
    userAuth: {},
    userAuthSuccess: false,
    userList: [],
    userListSuccess: false
}
 export default function userReducer (state, action) {
     if (typeof state === 'undefined') {
         return initialState
     }
     switch (action.type) {
         case LOGIN_LOADING:
         return {
             ...state,
             userAuthSuccess: false
         }
         case LOGIN_SUCCESS:
                 return {
                     ...state,
                     userAuthSuccess: true,
                     userAuth: action.payload
                 }
         case LOGIN_FAILUER:
             return {
                 ...state,
                 userAuthSuccess: false,
                 userAuth: action.payload
             }
             case REGISTER_LOADING:
                  return {
             ...state,
             userAuthSuccess: false
             }
             case REGISTER_SUCCESS:
                 return {
                     ...state,
                     userAuthSuccess: true,
                     userAuth: action.payload
                 }
             case REGISTER_FAILUER:
                  return {
                 ...state,
                 userAuthSuccess: false,
                 userAuth: action.payload
             }
             case USERLIST_LOADING:
                 return {
                     ...state,
                     userListSuccess: false
                 }
             case USERLIST_SUCCESS:
                 return {
                   ...state,
                   userListSuccess: true,
                   userList: action.payload
                 }
             case USERLIST_FAILUER:
                 return {
                     ...state,
                     userListSuccess: false,
                     userList: action.payload
                 }
             case USER_AUTH_SUCCESS:
                 return {
                     ...state,
                     userAuthSuccess: true,
                     userAuth: action.payload
                 }
             case USER_AUTH_FAILUER:
                 return {
                     ...state,
                     userAuthSuccess: false,
                     userAuth: action.payload
                 }
             case LOGOUT_SUCCESS:
                 return {
                     ...state,
                     userAuthSuccess: false,
                     userLogoutSuccess: true
                 }
             case LOGOUT_FAILUER:
                 return {
                     ...state,
                     userLogoutSuccess: false,
                     userAuth: action.payload
                 }
                 default:
                 return state;
     }
 }