import React from 'react';
import { connect } from 'react-redux';
import { restore } from 'actions/auth';
// import {Landing} from 'pages';
// import {AppLayout} from 'containers';

export default class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(restore());
  }
  render() {
    return this.props.children;
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.currentUser
  };
}

export default connect(mapStateToProps)(App);