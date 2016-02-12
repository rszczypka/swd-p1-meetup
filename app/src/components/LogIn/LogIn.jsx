import React from 'react';
import { reduxForm } from 'redux-form';
import messages from 'utils/messages';
import { Input } from 'react-bootstrap';

export default class LogIn extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit({
      email: this.emailInput.value,
      password: this.passInput.value
    })
  }

  render() {
    return (
      <div className="login-form">
        <h3>{messages.LOGIN_TITLE}</h3>
        <div className="well">
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group has-feedback">
            <label htmlFor="email">{ messages.EMAIL }</label>
            <input ref={(input) => this.emailInput = input}
                   className="form-control"
                   required
                   autocomplete="email"
                   type="email"
                   placeholder={ messages.EMAIL }
                   name="email"/>

          </div>
          <div className="form-group has-feedback">
            <label htmlFor="password">{ messages.PASSWORD }</label>
            <input ref={(input) => this.passInput = input}
                   className="form-control"
                   required
                   type="password"
                   placeholder={ messages.PASSWORD }
                   name="password"/>

          </div>
          <button type="submit" className="btn btn-primary"> { messages.LOGIN }</button>
        </form>
        </div>
        <a href="#" className="tosignup"
             onClick={this.props.toSignup}>
          {messages.LOGIN_TO_SIGNUP}
        </a>
      </div>
    )
  }
}


LogIn.propTypes = {
  onSubmit: React.PropTypes.func,
  toSignup: React.PropTypes.func,
  errors: React.PropTypes.array
};