import config from '../../../config/development';
import Firebase from 'firebase';
import {browserHistory as history } from 'react-router';


const fireRef = new Firebase(config.firebaseUrl);
const eventsRef = fireRef.child('events');

export function startListeningToEvents(id) {
  return (dispatch) => {
    eventsRef.orderByChild('uid').equalTo(id).on('value', (snapshot) => {
      dispatch({ type: 'RECEIVE_EVENTS_DATA', data: snapshot.val() || {} });
    });
  };
}

export function startEventEdit(qid) {
  return { type: 'START_EVENT_EDIT', qid };
}

export function dismissAlert() {
  return { type: 'DISMISS_ALERT' };
}

export function cancelEventEdit(qid) {
  return { type: 'FINISH_EVENT_EDIT', qid };
}

export function deleteEvent(qid) {
  return (dispatch) => {
    const errors = [];
    const messages = [];
    dispatch({ type: 'SUBMIT_EVENT_EDIT', qid });
    eventsRef.child(qid).remove((error) => {
      dispatch({ type: 'FINISH_EVENT_EDIT', qid });
      if (error) {
        errors.push(error.message);
        dispatch({ type: 'DISPLAY_ERROR', errors });
      } else {
        messages.push('Event successfully deleted!');
        dispatch({ type: 'DISPLAY_MESSAGE', messages });
      }
    });
  };
}

export function submitEventEdit(qid, content) {
  return (dispatch, getState) => {
    const errors = [];
    const messages = [];
    const state = getState();
    const username = state.loggedUser.password.email;
    const uid = state.loggedUser.uid;
    const error = false;
    if (error) {
      errors.push(error);
      dispatch({ type: 'DISPLAY_ERROR', errors });
    } else {
      dispatch({ type: 'SUBMIT_EVENT_EDIT', qid });
      eventsRef.child(qid).set({ content, username, uid }, (error2) => {
        dispatch({ type: 'FINISH_EVENT_EDIT', qid });
        if (error2) {
          errors.push(error2.message);
          dispatch({ type: 'DISPLAY_ERROR', errors });
        } else {
          messages.push('Update successfully saved!');
          dispatch({ type: 'DISPLAY_MESSAGE', messages });
        }
      });
    }
  };
}

export function submitNewEvent(content) {
  return (dispatch, getState) => {
    const errors = [];
    const messages = [];
    const state = getState();
    const uid = state.loggedUser.uid;
    content = Object.assign({}, content, {
      uid: uid
    });

    return  eventsRef.push().set(content, (error) => {
      if (error) {
        errors.push(error.message);
        dispatch({ type: 'DISPLAY_ERROR', errors });
      } else {
        messages.push('Submission successfully saved!');
        dispatch({ type: 'DISPLAY_MESSAGE', messages });
        history.push('/');
      }
    });
  };
}
