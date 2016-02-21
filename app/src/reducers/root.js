import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errors from './errors';
import messages from './messages';
import loggedUser from './loggedUser';
import events from './events';


export default combineReducers({
  errors,
  messages,
  loggedUser,
  events,
  form: formReducer // Mounted at 'form'.
});