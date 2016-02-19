import { combineReducers } from 'redux';

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

function events(state = [], action) {
  switch (action.type) {
    case 'DISPLAY_ERROR': return [...action.errors];
    case 'DISPLAY_MESSAGE': return [...action.messages];
    default: return state;
  }
}

export default combineReducers({
  signup, login, events
});