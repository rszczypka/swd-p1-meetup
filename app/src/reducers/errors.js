import {combineReducers} from 'redux';

function signup(state = [], action) {
  switch (action.type) {
    case 'SIGNUP_ERROR': return [...action.errors];
    case 'LOGIN_SUCCESS': return [];
    case 'SIGNUP_SUCCESS': return [];
    default: return state;
  }
}

function login(state = [], action) {
  switch (action.type) {
    case 'LOGIN_ERROR': return [...action.errors];
    case 'LOGIN_SUCCESS': return [];
    case 'SIGNUP_SUCCESS': return [];
    default: return state;
  }
}

function user(state = [], action) {
  switch (action.type) {
    case 'SAVE_USER_ERROR': return [...action.errors];
    /* case 'SAVE_USER_SUCCESS': return []; */
    case 'UPDATE_USER_SUCCESS': return [];
    default: return state;
  }
}

function events(state = [], action) {
  switch (action.type) {
    case 'SAVE_EVENT_ERROR': return [...action.errors];
    case 'SAVE_EVENT_SUCCESS': return [];
    case 'UPDATE_EVENT_SUCCESS': return [];
    default: return state;
  }
}

export default combineReducers({
  signup, login, user, events
});