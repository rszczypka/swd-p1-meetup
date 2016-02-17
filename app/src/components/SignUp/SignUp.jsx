import React from 'react';
import { reduxForm } from 'redux-form';
import messages from 'utils/messages';
import signupValidation from './signupValidation';
import MaskedInput from 'react-maskedinput';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const fields = ['nameInput', 'emailInput', 'passInput', 'showPassword', 'employerInput', 'jobtitleInput', 'dobInput'];

class SignUp extends React.Component {

  render() {
    const {fields: {nameInput, emailInput, passInput, showPassword, employerInput, jobtitleInput, dobInput}, valid, handleSubmit, asyncErrors, submitting} = this.props;

    const passwordPopover = (
      <Popover id="passwordPopover" title="Strong password tips.">
        Please use at least<br />
        <span className="label label-default" title="lowercase letter">8+</span> 8 characters<br />
        <span className="label label-default" title="lowercase letter">a-z</span> one lowercase letter<br />
        <span className="label label-default" title="uppercase letter">A-Z</span> one uppercase letter<br />
        <span className="label label-default" title="number">0-9</span> one number<br />
        <span className="label label-default" title="special character">!, @, #, $, %, ^, &, *</span> one special
        character<br />
      </Popover>
    );



    return (
      <form onSubmit={ handleSubmit }>
        <p>Fields required to create an account </p>
        <div className={(asyncErrors.length) ? 'alert alert-danger':''}>
          <ul id="login-error" className="list-unstyled">
            {asyncErrors
              .map((error, key) => <li key={key}><span className="label label-danger">error</span> {error} </li>)
            }
          </ul>
        </div>
        <div
          className={(nameInput.touched && nameInput.dirty && nameInput.error) ? 'form-group has-error has-feedback' : 'form-group has-feedback'}>
          <label htmlFor="name">{messages.NAME}*</label>
          <input { ...nameInput }
            className="name form-control"
            required
            autoFocus={true}
            autoComplete="on"
            type="text"
            disabled={ submitting }
            placeholder={messages.NAME}
            name="name"/>
          {nameInput.touched && nameInput.dirty && nameInput.error &&
          <div className="text-danger"><span className="label label-danger">error</span> {nameInput.error}</div>}
        </div>
        <div
          className={(emailInput.touched && emailInput.error) ? 'form-group has-error has-feedback' : 'form-group has-feedback'}>
          <label htmlFor="email">{messages.EMAIL}*</label>
          <input { ...emailInput }
            className="email form-control"
            required
            type="email"
            autoComplete="on"
            disabled={ submitting }
            placeholder={messages.EMAIL}
            name="email"/>
          {emailInput.touched && emailInput.error &&
          <div className="text-danger"><span className="label label-danger">error</span> {emailInput.error}</div>}
        </div>
        <div
          className={(passInput.touched && passInput.error) ? 'form-group has-error has-feedback' : 'form-group has-feedback'}>
          <label htmlFor="password">{messages.PASSWORD}* </label>
          <label className="pull-right">
            <input { ...showPassword }
              type="checkbox"
              value=""/> { 'Show password' }
          </label>
            <OverlayTrigger trigger="click" rootClose placement="top" overlay={passwordPopover}>
              <input { ...passInput }
                className="password form-control"
                required
                type={showPassword.value ? 'text' : 'password'}
                disabled={ submitting }
                placeholder={messages.PASSWORD}
                name="password"/>
            </OverlayTrigger>
          {passInput.touched && passInput.error &&
          <div className="text-danger"><span className="label label-danger">error</span> {passInput.error}</div>}
        </div>
        <p>Optionally, answer the questions below</p>
        <div className={'form-group has-feedback'}>
          <label htmlFor="organization">{messages.EMPLOYER}</label>
          <input { ...employerInput }
            className="name form-control"
            type="text"
            autoComplete="on"
            disabled={ submitting }
            placeholder={messages.EMPLOYER}
            name="organization"/>
        </div>
        <div className={'form-group has-feedback'}>
          <label htmlFor="organization-title">{messages.JOBTITLE}</label>
          <input { ...jobtitleInput }
            className="name form-control"
            autoComplete="on"
            type="text"
            disabled={ submitting }
            placeholder={messages.JOBTITLE}
            name="organization-title"/>
        </div>
        <div
          className={(dobInput.touched && dobInput.error) ? 'form-group has-error has-feedback' : 'form-group has-feedback'}>
          <label htmlFor="bday">{messages.DOB}</label>
          <MaskedInput { ...dobInput }
            className="name form-control"
            mask="11/11/1111"
            type="text"
            autoComplete="on"
            disabled={ submitting }
            placeholder={ 'dd/mm/yyyy' }
            name="bday"
          />
          {dobInput.touched && dobInput.error &&
          <div className="text-danger"><span className="label label-danger">error</span> {dobInput.error}</div>}
        </div>
        <button className="btn btn-primary" type="submit"
                disabled={ !valid || submitting }>{ submitting ? messages.SUBMITTING : messages.SIGNUP }</button>
      </form>

    );
  }
}

SignUp.propTypes = {
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  valid: React.PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'signup',
  fields,
  validate: signupValidation
})(SignUp);