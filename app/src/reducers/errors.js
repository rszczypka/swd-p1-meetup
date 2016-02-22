import { combineReducers } from 'redux';
import initialState from '../stores/initialState';

function signup(state, action) {
  switch (action.type) {
    case 'SIGNUP_ERROR': return [...action.errors];
    case 'LOGIN_SUCCESS': return [];
    case 'SIGNUP_SUCCESS': return [];
    default: return state || initialState.errors.signup;
  }
}

function login(state, action) {
  switch (action.type) {
    case 'LOGIN_ERROR': return [...action.errors];
    case 'LOGIN_SUCCESS': return [];
    case 'SIGNUP_SUCCESS': return [];
    default: return state || initialState.errors.login;
  }
}

function events(state, action) {
  switch (action.type) {
    case 'DISPLAY_ERROR': return [...action.errors];
    default: return state || initialState.errors.events;
  }
}

export default combineReducers({
  signup, login, events
});