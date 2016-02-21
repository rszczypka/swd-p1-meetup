import {browserHistory as history } from 'react-router';
import config from '../../../config/development';
import Firebase from 'firebase';
import { startListeningToEvents } from 'actions/events';

const fireRef = new Firebase(config.firebaseUrl);
const usersRef = fireRef.child('users');
const eventsRef = fireRef.child('events');

export function loginSuccess(user) {
  return {
    type: 'LOGIN_SUCCESS',
    user
  };
}

export function loginAttempt() {
  return {
    type: 'LOGIN_ATTEMPT'
  };
}

export function loginFailed(errors) {
  return {
    type: 'LOGIN_ERROR',
    errors
  };
}

export function signupSuccess(user) {
  return {
    type: 'SIGNUP_SUCCESS',
    user
  };
}

export function signupAttempt() {
  return {
    type: 'SIGNUP_ATTEMPT'
  };
}

export function signupFailed(errors) {
  return {
    type: 'SIGNUP_ERROR',
    errors
  };
}

export function logoutAction() {
  return {
    type: 'LOGOUT'
  };
}

export function fetchUserData(id) {
  return (dispatch) => {
    usersRef.child(id).once('value', function (snapshot) {
      dispatch({ type: 'RECEIVE_USER_ADDITIONAL_DATA', data: snapshot.val() });
    });
  };
}

export function fetchEventsData(id) {
  return (dispatch) => {
    eventsRef.orderByChild('uid').equalTo(id).once('value', function (snapshot) {
      dispatch({ type: 'RECEIVE_EVENTS_DATA', data: snapshot.val() });
    });
  };
}

export function login(params) {
  return (dispatch) => {
    const errors = [];
    dispatch(loginAttempt());
    return fireRef.authWithPassword({
      email: String(params.email),
      password: String(params.password)
    }, (error, authData) => {
      if (error) {
        errors.push(error.message);
        dispatch(loginFailed(errors));
      } else {
        dispatch(loginSuccess(authData));
        dispatch(fetchUserData(authData.uid));
        dispatch(fetchEventsData(authData.uid));
        dispatch(startListeningToEvents(authData.uid));

        const route = location.pathname;
        if (route === '/login' || route === '/landing') {
          history.push('/');
        }
      }
    });
  };
}

export function saveAdditionalUserData(uid, params) {
  return (dispatch) => {
    const errors = [];
    return usersRef.child(uid).set({
      fullName: params.fullName || '',
      organization: params.organization || '',
      organizationTitle: params.organizationTitle || '',
      bday: params.bday || ''
    }, (error) => {
      if (error) {
        errors.push(error.message);
        dispatch(signupFailed(errors));
      }
    });
  };
}

export function signup(params) {
  return (dispatch) => {
    const errors = [];
    const user = {};
    dispatch(signupAttempt());

    return fireRef.createUser({
      email: params.email,
      password: params.password
    }, (error, userData) => {
      if (error) {
        errors.push(error.message);
        dispatch(signupFailed(errors));
      } else {
        user.id = userData.uid;
        user.email = params.email;
        user.password = params.password;

        dispatch(saveAdditionalUserData(userData.uid, params));
        dispatch(signupSuccess(user));
        dispatch(login({
          email: params.email,
          password: params.password
        }));

        const route = location.pathname;
        if (route === '/signup' || route === '/landing') {
          history.push('/');
        }
      }
    });
  };
}

export function logout() {
  return (dispatch) => {
    fireRef.unauth();
    dispatch(logoutAction());
    history.push('/landing');
  };
}

export function restore() {
  return (dispatch) => {
    const authData = fireRef.getAuth();

    if (authData) {
      dispatch(loginSuccess(authData));
      dispatch(fetchUserData(authData.uid));
      dispatch(fetchEventsData(authData.uid));
      dispatch(startListeningToEvents(authData.uid));
    }
  };
}