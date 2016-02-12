import React from 'react';
import { reduxForm } from 'redux-form';
import messages from 'utils/messages';

class LogInNew extends React.Component {
  const {fields: {emailInput, passInput}, handleSubmit} = this.props;
  render() {
    return (
        <form onSubmit={handlgit eSubmit}>
          <div className="form-group has-feedback">
            <label htmlFor="email">{ messages.EMAIL }</label>
            <input {...emailInput}
                   className="form-control"
                   required
                   autocomplete="email"
                   type="email"
                   placeholder={ messages.EMAIL }
                   name="email"/>

          </div>
          <div className="form-group has-feedback">
            <label htmlFor="password">{ messages.PASSWORD }</label>
            <input {...passInput}
                   className="form-control"
                   required
                   type="password"
                   placeholder={ messages.PASSWORD }
                   name="password"/>

          </div>
          <button type="submit" className="btn btn-primary"> { messages.LOGIN }</button>
        </form>
    )
  }
}


LogInNew = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'login',                           // a unique name for this form
  fields: ['emailInput', 'passInput'] // all the fields in your form
})(ContactForm);

export default LogInNew;