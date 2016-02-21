import React from 'react';
import { connect } from 'react-redux';
import { LogIn } from 'components';
import { login } from 'actions/auth';
import {browserHistory as history } from 'react-router';
import messages from 'utils/messages';

class LoginPage extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(params) {
    return this.props.dispatch(login({
      email: params.emailInput,
      password: params.passInput,
      redirect: true
    }));
  }

  toSignup() {
    history.push('/signup');
  }

  render() {
    return (
      <div className="login-form">
        <a href="#" className="tosignup pull-right" onClick={ this.toSignup }>
          { messages.LOGIN_TO_SIGNUP }
        </a>
        <h4>{ messages.LOGIN_TITLE }</h4>
        <div className="well">
          <LogIn
            onSubmit={ this.handleSubmit }
            asyncErrors={ this.props.errors }
          />
        </div>

      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: React.PropTypes.func,
  errors: React.PropTypes.array,
  toSignup: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    errors: state.errors.login
  };
}

const SmartLogin = connect(mapStateToProps)(LoginPage);
export default SmartLogin;