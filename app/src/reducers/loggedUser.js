import initialState from '../stores/initialState';

export default function loggedUser(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, action.user);
    case 'LOGIN_FAILED':
      return initialState.loggedUser;
    case 'LOGOUT':
      return initialState.loggedUser;
    case 'RECEIVE_USER_ADDITIONAL_DATA':
      return Object.assign({}, state, {
        hasreceiveddata: true,
        data: action.data
      });
    default:
      return state || initialState.loggedUser;
  }
}