import React from 'react';
import { reduxForm } from 'redux-form';
import messages from 'utils/messages';
import loginValidation from './loginValidation';

const fields = [
  'emailInput',
  'passInput'
];

class LogIn extends React.Component {
  render() {
    const {
      fields: {
        emailInput,
        passInput
        },
      valid,
      handleSubmit,
      asyncErrors,
      submitting
      } = this.props;

    return (
      <form onSubmit={ handleSubmit }>
        <div className={ (asyncErrors.length) ? 'alert alert-danger' : '' }>
          <ul id="login-error" className="list-unstyled">
            {asyncErrors
              .map((error, key) =>
                <li
                  key={key}
                >
                    <span
                      className="label label-danger"
                    >error</span> {error}
                </li>
              )
            }
          </ul>
        </div>
        <div
          className={ (emailInput.touched && emailInput.dirty && emailInput.error) ?
            'form-group has-error has-feedback' : 'form-group has-feedback' }
        >
          <label htmlFor="email">{ messages.EMAIL }</label>
          <input {...emailInput}
            className="form-control"
            required
            autoFocus
            autoComplete="email"
            type="email"
            name="email"
            disabled={ submitting }
            placeholder={ messages.EMAIL }
          />
          {
            emailInput.touched && emailInput.dirty && emailInput.error &&
            <div
              className="text-danger"
            >
              <span
                className="label label-danger"
              >error</span> { emailInput.error }
            </div>
          }
        </div>
        <div
          className={ (passInput.touched && passInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback' }
        >
          <label htmlFor="password">{ messages.PASSWORD }</label>
          <input {...passInput}
            className="form-control"
            required
            type="password"
            disabled={ submitting }
            placeholder={ messages.PASSWORD }
            name="password"
          />
          {
            passInput.touched && passInput.error &&
            <div
              className="text-danger"
            >
            <span
              className="label label-danger"
            >error</span> {passInput.error}
            </div>
          }
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={ !valid || submitting }
        >
          { submitting ? messages.SUBMITTING : messages.LOGIN }
        </button>
      </form>
    );
  }
}

LogIn.propTypes = {
  fields: React.PropTypes.object.isRequired,
  asyncErrors: React.PropTypes.array.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  valid: React.PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'login',
  fields,
  validate: loginValidation
})(LogIn);