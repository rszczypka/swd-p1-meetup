export default function loggedUser(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': return Object.assign({}, action.user);
    case 'LOGIN_AWAITING': return {};
    case 'LOGIN_FAILED': return {};
    case 'LOGOUT': return {};
    default: return state;
  }
}