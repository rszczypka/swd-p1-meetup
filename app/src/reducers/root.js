import {combineReducers} from 'redux';
import errors from 'errors';
import events from 'events';
import loggedUser from 'loggedUser';

export default combineReducers({
  events,
  errors,
  loggedUser,
});