export default function events(state = {}, action) {
  let newstate;
  switch (action.type) {
    case 'RECEIVE_EVENTS_DATA':
      return Object.assign({}, state, {
        hasreceiveddata: true,
        data: action.data
      });
    case 'AWAIT_NEW_EVENT_RESPONSE':
      return Object.assign({}, state, {
        submittingnew: true
      });
    case 'RECEIVE_NEW_EVENT_RESPONSE':
      return Object.assign({}, state, {
        submittingnew: false
      });
    case 'START_EVENT_EDIT':
      newstate = Object.assign({}, state);
      newstate.states[action.qid] = 'EDITING_EVENT';
      return newstate;
    case 'FINISH_EVENT_EDIT':
      newstate = Object.assign({}, state);
      delete newstate.states[action.qid];
      return newstate;
    case 'SUBMIT_EVENT_EDIT':
      newstate = Object.assign({}, state);
      newstate.states[action.qid] = 'SUBMITTING_EVENT';
      return newstate;

    default:
      return state;
  }
}