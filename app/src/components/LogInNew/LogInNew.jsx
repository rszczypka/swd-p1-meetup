import React from 'react';
import { reduxForm } from 'redux-form';
import messages from 'utils/messages';
import { login } from 'actions/auth';

const fields = ['emailInput', 'passInput'];

const validate = values => {
  const errors = {};

  if (!values.emailInput) {
    errors.emailInput = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailInput)) {
    errors.emailInput = 'Invalid email address';
  }

  return errors;
};


class LogInNew extends React.Component {

  render() {
    const handleSubmit = (event) => {
      event.preventDefault();

      this.props.dispatch(login({
        email: this.props.fields.emailInput.value,
        password: this.props.fields.passInput.value,
        redirect: true
      }));
    }
    const {fields: {emailInput, passInput}, valid, submitting} = this.props;

    return (
        <form onSubmit={handleSubmit}>
          <div className={(emailInput.touched && emailInput.error) ? 'form-group has-error has-feedback' : 'form-group has-success has-feedback'}>
            <label htmlFor="email">{ messages.EMAIL }
            <input {...emailInput}
                   className="form-control"
                   required
                   autoComplete="email"
                   type="email"
                   name="email"
                   placeholder={ messages.EMAIL }
                   /></label>
            {emailInput.touched && emailInput.error && <div>{emailInput.error}</div>}
            {emailInput.touched
              && emailInput.valid
              && <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
              && <span className="sr-only">(success)</span>}

          </div>
          <div className={(passInput.touched && passInput.error) ? 'form-group has-error has-feedback' : 'form-group has-success has-feedback'}>
            <label htmlFor="password">{ messages.PASSWORD }
            <input {...passInput}
                   className="form-control"
                   required
                   type="password"
                   placeholder={ messages.PASSWORD }
                   name="password"/></label>

          </div>
          <button type="submit" className="btn btn-primary" disabled={ !valid }>{ messages.LOGIN }</button>
        </form>
    )
  }
}

LogInNew.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  valid: React.PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'login',
  fields,
  validate
})(LogInNew);