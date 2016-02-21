import React from 'react';
import { connect } from 'react-redux';
import { restore } from 'actions/auth';

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
    user: state.loggedUser
  };
}

export default connect(mapStateToProps)(App);