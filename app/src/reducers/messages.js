
export default function events(state = [], action) {
  switch (action.type) {
    case 'DISPLAY_MESSAGE':
      return Object.assign({}, state, {
        alertVisible: true,
        messages: action.messages
      });
    case 'DISMISS_ALERT':
      return Object.assign({}, state, {
        alertVisible: false,
        messages: undefined
      });
    default: return state;
  }
}