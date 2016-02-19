
export default function events(state = [], action) {
  switch (action.type) {
    case 'DISPLAY_MESSAGE': return [...action.messages];
    default: return state;
  }
}