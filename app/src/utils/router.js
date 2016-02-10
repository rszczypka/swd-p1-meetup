import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

export default function render() {
  ReactDOM.render(<App />, document.getElementById('meetUp'));
}
