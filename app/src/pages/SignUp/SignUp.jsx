import React from 'react';
import { connect } from 'react-redux';
import * as Components from 'components';
import { signup } from 'actions/auth';
import {browserHistory as history } from 'react-router';
import messages from 'utils/messages';

class SignUp extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(params) {
    return this.props.dispatch(signup({
      email: params.emailInput,
      password: params.passInput,
      fullName: params.nameInput,
      organization: params.employerInput,
      organizationTitle: params.jobtitleInput,
      bday: params.dobInput,
      redirect: true
    }));
  }

  toLogin() {
    history.push('/login');
  }

  render() {
    return (
      <div className="signup-form">
        <a
          href="#"
          className="already pull-right"
          onClick={ this.toLogin }
        >{ messages.SIGNUP_TO_LOGIN }</a>
        <h4>Sign up!</h4>
        <div className="well">
          <Components.SignUp
            asyncErrors={this.props.errors}
            onSubmit={ this.handleSubmit }
          />
        </div>
      </div>
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
