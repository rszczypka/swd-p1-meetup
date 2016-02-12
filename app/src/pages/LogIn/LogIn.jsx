import React from 'react';
import { connect } from 'react-redux';
import { LogInNew } from 'components';
import { login } from 'actions/auth';
import history from 'utils/history';

class LoginPage extends React.Component {
  onSubmit(params) {
    this.props.dispatch(login({ ...params, redirect: true }));
  }
  toSignup() {
    history.replaceState(null, '/signup');
  }
  render() {
    return (
      <div className="login-form">
        <h3>{messages.LOGIN_TITLE}</h3>
        <div className="well">
          <LogInNew />
        </div>
        <a href="#" className="tosignup"
           onClick={this.props.toSignup}>
          {messages.LOGIN_TO_SIGNUP}
        </a>
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
