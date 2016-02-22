import React from 'react';
import { connect } from 'react-redux';
import { restore } from 'actions/auth';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(restore());
  }
  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
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