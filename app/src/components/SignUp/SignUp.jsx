/* eslint react/jsx-no-bind:0 */
import React from 'react';
import { reduxForm } from 'redux-form';
import messages from 'utils/messages';
import signupValidation from './signupValidation';
import MaskedInput from 'react-maskedinput';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const fields = [
  'nameInput',
  'emailInput',
  'passInput',
  'showPassword',
  'employerInput',
  'jobtitleInput',
  'dobInput'
];

class SignUp extends React.Component {

  render() {
    const {
      fields: {
        nameInput,
        emailInput,
        passInput,
        showPassword,
        employerInput,
        jobtitleInput,
        dobInput
        },
      valid,
      handleSubmit,
      asyncErrors,
      submitting
      } = this.props;

    const passwordPopover = (
      <Popover id="passwordPopover" title="Strong password tips.">
        Please use at least<br />
        <span
          className="label label-default"
          title="lowercase letter"
        > 8+</span> 8 characters<br />
        <span
          className="label label-default"
          title="lowercase letter"
        > a-z</span> one lowercase letter<br />
        <span
          className="label label-default"
          title="uppercase letter"
        >A-Z</span> one uppercase letter<br />
        <span
          className="label label-default"
          title="number"
        >0-9</span> one number<br />
        <span
          className="label label-default"
          title="special character"
        >!, @, #, $, %, ^, &, *</span> one special character<br />
      </Popover>
    );

    return (
      <form
        onSubmit={ handleSubmit }
        aria-invalid={ asyncErrors.length > 0 }
        aria-describedby="formAsyncErrors"
      >
        <p>{ messages.FIELDS_REQUIRED }</p>
        <div className={ (asyncErrors.length) ? 'alert alert-danger' : '' }>
          <ul
            role="alert"
            id="formAsyncErrors"
            ref="formAsyncErrors"
            id="login-error"
            className="list-unstyled"
          >
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
          className={
          (nameInput.touched && nameInput.dirty && nameInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'
          }
        >
          <label htmlFor="name">{messages.NAME}<span title="required">*</span></label>
          <input { ...nameInput }
            className="name form-control"
            required
            autoFocus
            autoComplete="on"
            type="text"
            disabled={ submitting }
            placeholder={messages.NAME}
            name="name"
            id="name"
            aria-invalid={ nameInput.error }
            aria-required
            aria-describedby="nameInputError"
          />
          { nameInput.touched && nameInput.dirty && nameInput.error &&
          <div
            className="text-danger"
            id="nameInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {nameInput.error}</div> }
        </div>
        <div
          className={(emailInput.touched && emailInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'}
        >
          <label htmlFor="email">{messages.EMAIL}<span title="required">*</span></label>
          <input { ...emailInput }
            className="email form-control"
            required
            type="email"
            autoComplete="on"
            disabled={ submitting }
            placeholder={messages.EMAIL}
            name="email"
            id="email"
            aria-invalid={ emailInput.error }
            aria-required
            aria-describedby="emailInputError"
          />
          { emailInput.touched && emailInput.error &&
          <div
            className="text-danger"
            id="emailInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {emailInput.error}</div> }
        </div>
        <div
          className={(passInput.touched && passInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'}
        >
          <label htmlFor="password">{messages.PASSWORD}* </label>
          <label className="pull-right">
            <input { ...showPassword }
              type="checkbox"
              value=""
              name="showPassword"
              id="showPassword"
            /> { 'Show password' }
          </label>
            <OverlayTrigger
              ref="passOverlay"
              trigger="click"
              placement="top"
              overlay={ passwordPopover }
            >
              <input { ...passInput }
                className="password form-control"
                required
                onKeyUp={ () => this.refs.passOverlay.hide() }
                type={showPassword.value ? 'text' : 'password'}
                disabled={ submitting }
                placeholder={messages.PASSWORD}
                name="password"
                id="password"
                aria-invalid={ passInput.error }
                aria-required
                aria-describedby="passInputError"
              />
            </OverlayTrigger>
          { passInput.touched && passInput.error &&
          <div
            className="text-danger"
            id="passInputError"
            role="alert"
          ><span
            className="label label-danger"
          >error</span> {passInput.error}</div> }
        </div>
        <p>Optionally, answer the questions below</p>
        <div className={ 'form-group has-feedback' }>
          <label htmlFor="organization">{messages.EMPLOYER}</label>
          <input { ...employerInput }
            className="name form-control"
            type="text"
            autoComplete="on"
            disabled={ submitting }
            placeholder={messages.EMPLOYER}
            name="organization"
            id="organization"
          />
        </div>
        <div className={ 'form-group has-feedback' }>
          <label htmlFor="organization-title">{ messages.JOBTITLE }</label>
          <input { ...jobtitleInput }
            className="name form-control"
            autoComplete="on"
            type="text"
            disabled={ submitting }
            placeholder={ messages.JOBTITLE }
            name="organization-title"
            id="organization-title"
          />
        </div>
        <div
          className={ (dobInput.touched && dobInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'}
        >
          <label htmlFor="bday">{messages.DOB}</label>
          <MaskedInput { ...dobInput }
            className="name form-control"
            mask="11/11/1111"
            type="text"
            autoComplete="on"
            disabled={ submitting }
            placeholder={ 'dd/mm/yyyy' }
            name="bday"
            id="bday"
            aria-invalid={ dobInput.error }
            aria-required
            aria-describedby="dobInputError"
          />
          { dobInput.touched && dobInput.error &&
          <div
            className="text-danger"
            id="dobInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {dobInput.error}</div> }
        </div>
        <button
          className="btn btn-primary btn-block" type="submit"
          disabled={ !valid || submitting }
        >{ submitting ? messages.SUBMITTING : messages.SIGNUP }</button>
      </form>
    );
  }
}

SignUp.propTypes = {
  fields: React.PropTypes.object.isRequired,
  asyncErrors: React.PropTypes.array.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  valid: React.PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'signup',
  fields,
  validate: signupValidation
})(SignUp);