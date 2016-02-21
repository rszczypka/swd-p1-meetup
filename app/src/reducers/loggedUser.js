export default function loggedUser(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': return Object.assign({}, action.user);
    case 'LOGIN_FAILED': return {};
    case 'LOGOUT': return {};
    case 'RECEIVE_USER_ADDITIONAL_DATA':
      return Object.assign({}, state, {
      hasreceiveddata: true,
      data: action.data
    });
    default: return state;
  }
}