import React from 'react';
import {connect} from 'react-redux';
import * as Components from 'components';
import { signup } from 'actions/auth';
import history from 'utils/history';

class SignUp extends React.Component {
  onSubmit(params) {
    this.props.dispatch(signup({...params, redirect: true}));
  }
  toLogin() {
    history.replaceState(null, '/login');
  }
  render() {
    return (
      <Components.SignUp errors={this.props.errors}
                         toLogin={this.props.toLogin || this.toLogin}
                         onSubmit={this.onSubmit.bind(this)}/>
    );
  }
}

SignUp.propTypes = {
  dispatch: React.PropTypes.func,
  errors: React.PropTypes.array,
  toLogin: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    errors: state.errors.signup
  };
}

export default connect(mapStateToProps)(SignUp);
