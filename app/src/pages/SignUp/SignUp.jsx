import React from 'react';
import {connect} from 'react-redux';
import * as Components from 'components';
import { signup } from 'actions/auth';
import history from 'utils/history';
import messages from 'utils/messages';

class SignUp extends React.Component {
  handleSubmit(params) {

    return this.props.dispatch(signup({
      email: params.emailInput,
      password: params.passInput,
      redirect: true }));

  }
  toLogin() {
    history.replaceState(null, '/login');
  }
  render() {
    return (
      <div className="signup-form">
        <h3>Sign up!</h3>
        <div className="well">
          <Components.SignUp asyncErrors={this.props.errors}
                         onSubmit={this.handleSubmit.bind(this)}/>
        </div>
        <a href="#" className="already"
           onClick={ this.toLogin }>{messages.SIGNUP_TO_LOGIN}
        </a>
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
