import React from 'react';
import messages from 'utils/messages';

export default class SignUp extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      email: this.emailInput.value,
      password: this.passInput.value,
    });
  }
  render() {
    return (
      <div className="signup-form">
        <h3>Sign up!</h3>
        <ul id="signup-error">
          {this.props.errors
            .map((error, key) => <li key ={key}> {error} </li>)
          }
        </ul>
        <div className="well">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="email">{messages.EMAIL}
                <input ref={(input) => this.emailInput = input}
                       className="email form-control"
                       type="email"
                       placeholder={messages.EMAIL}
                       name="email"/>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">{messages.PASSWORD}
                <input ref={(input) => this.passInput = input}
                       className="password form-control"
                       type="password"
                       placeholder={messages.PASSWORD}
                       name="password"/>
              </label>
            </div>
            <button className="btn btn-primary" type="submit">{messages.SIGNUP}</button>
          </form>
        </div>
        <a href="#" className="already"
             onClick={this.props.toLogin}>
          {messages.SIGNUP_TO_LOGIN}
        </a>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSubmit: React.PropTypes.func,
  toLogin: React.PropTypes.func,
  errors: React.PropTypes.array
};