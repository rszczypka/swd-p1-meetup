import history from 'utils/history';
import router from 'utils/router';
import {signup as signupValidate} from 'common/validations';
import config from '../../../config/development';
import Firebase from 'firebase';

const fireRef = new Firebase(config.firebaseUrl);


export function loginSuccess(user) {
  return {
    type: 'LOGIN_SUCCESS',
    user,
  };
}

export function loginAttempt() {
  return {
    type: 'LOGIN_ATTEMPT',
  };
}

export function loginFailed(errors) {
  return {
    type: 'LOGIN_ERROR',
    errors,
  };
}

export function signupSuccess(user) {
  return {
    type: 'SIGNUP_SUCCESS',
    user,
  };
}

export function signupAttempt() {
  return {
    type: 'SIGNUP_ATTEMPT',
  };
}

export function signupFailed(errors) {
  return {
    type: 'SIGNUP_ERROR',
    errors,
  };
}

export function logoutAction() {
  return {
    type: 'LOGOUT',
  };
}

export function login(params) {
  return (dispatch) => {
    const errors = [];
    dispatch(loginAttempt());
    return fireRef.authWithPassword({
      email: String(params.email),
      password: String(params.password)
    }, function(error, authData) {
      if(error) {
        errors.push(error.message)
        dispatch(loginFailed(errors));
      } else {
        dispatch(loginSuccess(authData));
        //dispatch(fetchLists(user.id));

        const route = location.pathname;
        if (route === '/login' || route === '/landing') {
          history.replaceState(null, '/');
        }
      }
    });

  };
}

export function signup(params) {
  return (dispatch) => {
    const validationError = signupValidate(params);
    const errors = [];
    const user = {};
    dispatch(signupAttempt());
    if (validationError) return dispatch(signupFailed(validationError));

    return fireRef.createUser({
      email: params.email,
      password: params.password,
    }, function(error, userData) {
      if(error) {
        errors.push(error.message)
        dispatch(signupFailed(errors));
      } else {
        user.id=userData.uid;
        user.email = params.email;
        user.password = params.password;
        dispatch(loginSuccess(user));

        const route = location.pathname;
        if (route === '/singup' || route === '/landing') {
          history.replaceState(null, '/');
        }
      }

    });
  };
}

export function logout() {
  return (dispatch) => {
    fireRef.unauth();
    dispatch(logoutAction());
    // router();
    storage.remove('firebase:session::meetupeventplanner');
    history.replaceState(null, '/landing');
  };
}

export function restore() {
  return (dispatch) => {
    let authData = fireRef.getAuth();

    if(authData) {
      dispatch(loginSuccess(authData));
      //dispatch(fetchLists(user.id));
    }
  };
}

