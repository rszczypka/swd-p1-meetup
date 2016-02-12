import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errors from './errors';
import loggedUser from './loggedUser';


export default combineReducers({
  errors,
  loggedUser,
  form: formReducer //Mounted at 'form'.
});