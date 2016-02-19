export default function events(state = {}, action) {
  let newstate;
  switch (action.type) {
    case 'RECEIVE_ARTICLES_DATA':
      return Object.assign({}, state, {
        hasreceiveddata: true,
        data: action.data
      });
    case 'AWAIT_NEW_ARTICLE_RESPONSE':
      return Object.assign({}, state, {
        submittingnew: true
      });
    case 'RECEIVE_NEW_ARTICLE_RESPONSE':
      return Object.assign({}, state, {
        submittingnew: false
      });
    case 'START_ARTICLE_EDIT':
      newstate = Object.assign({}, state);
      newstate.states[action.qid] = 'EDITING_ARTICLE';
      return newstate;
    case 'FINISH_ARTICLE_EDIT':
      newstate = Object.assign({}, state);
      delete newstate.states[action.qid];
      return newstate;
    case 'SUBMIT_ARTICLE_EDIT':
      newstate = Object.assign({}, state);
      newstate.states[action.qid] = 'SUBMITTING_ARTICLE';
      return newstate;
    default:
      return state;
  }
}