/* eslint prefer-template:0, react/jsx-no-bind:0 */
import React from 'react';
import { reduxForm } from 'redux-form';
import messages from 'utils/messages';
import addEventValidation from './addEventValidation';
import 'react-widgets/lib/less/react-widgets.less';
import Moment from 'moment';
import Combobox from 'react-widgets/lib/Combobox';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import Geosuggest from 'react-geosuggest';

momentLocalizer(Moment);
const today = new Date();
today.setHours(0, 0, 0, 0);

const fields = [
  'nameInput',
  'typeInput',
  'hostInput',
  'startInput',
  'startStringInput',
  'endInput',
  'endStringInput',
  'guestsInput',
  'locationInput',
  'locationLatInput',
  'locationLngInput',
  'descriptionInput'
];

class AddEvent extends React.Component {
  constructor() {
    super();
    this.handleGeolocation = this.handleGeolocation.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleGeolocation(suggest) {
    this.props.fields.locationInput.onChange(suggest.label);
    this.props.fields.locationLatInput.onChange(suggest.location.lat);
    this.props.fields.locationLngInput.onChange(suggest.location.lng);
  }

  handleDate(date, name) {
    this.props.fields[name + 'StringInput'].onChange(date.toString());
    if (name === 'start' && !this.props.fields.endInput.value) {
      this.props.fields.endInput.onChange(date);
      this.props.fields.endStringInput.onChange(date.toString());
    }
  }

  render() {
    const {
      fields: {
        nameInput,
        typeInput,
        hostInput,
        startInput,
        startStringInput,
        endInput,
        endStringInput,
        guestsInput,
        locationInput,
        locationLatInput,
        locationLngInput,
        descriptionInput
        },
      valid,
      handleSubmit,
      asyncErrors,
      submitting
      } = this.props;

    const eventTypesList = [
      'Birthday party',
      'Conference talk',
      'Wedding'
    ];

    const eventGuestsList = [
      'Mom & Dad only',
      'Extended family',
      'Close friends',
      'Family and close friends',
      'Work colleagues'
    ];

    return (
      <form
        onSubmit={ handleSubmit }
        aria-invalid={ asyncErrors.length > 0 }
        aria-describedby="formAsyncErrors"
      >
        <p>{ messages.FIELDS_REQUIRED_EVENTS }</p>
        <div
          role="alert"
          id="formAsyncErrors"
          className={ (asyncErrors.length) ? 'alert alert-danger' : '' }
        >
          <ul id="login-error" className="list-unstyled">
            {asyncErrors
              .map((error, key) =>
                <li
                  key={key}
                >
                  <span
                    className="label label-danger"
                  >error</span> { error }
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
          <label htmlFor="name">{messages.EVENT_NAME_LABEL}<span title="required">*</span></label>
          <input { ...nameInput }
            className="name form-control"
            required
            autoFocus
            autoComplete="off"
            type = "text"
            disabled = { submitting }
            placeholder = { messages.EVENT_NAME_PLACEHOLDER }
            aria-invalid={ nameInput.error }
            aria-required
            aria-describedby="nameInputError"
            name = "name"
            id="name"
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
          className={
          (typeInput.touched && typeInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'
          }
        >
          <label htmlFor="type">{messages.EVENT_TYPE_LABEL}<span title="required">*</span></label>
          <Combobox { ...typeInput }
            value={ typeInput.value }
            onBlur={ () => typeInput.onBlur(typeInput.value) }
            data = { eventTypesList }
            required
            type="text"
            disabled = { submitting }
            placeholder = { messages.EVENT_TYPE_PLACEHOLDER }
            suggest
            aria-invalid={ typeInput.error }
            aria-required
            aria-describedby="typeInputError"
            name="type"
            id="type"
          />
          { typeInput.touched && typeInput.error &&
          <div
            className="text-danger"
            role="alert"
            id="typeInputError"
          >
            <span
              className="label label-danger"
            >error</span> {typeInput.error}</div> }
        </div>

        <div
          className={
          (hostInput.touched && hostInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'
          }
        >
          <label
            htmlFor="hostName"
          >
            {messages.EVENT_HOST_LABEL}
            <span title="required">*</span>
          </label>
          <input { ...hostInput }
            className="hostName form-control"
            required
            type = "text"
            disabled = { submitting }
            placeholder = { messages.EVENT_HOST_PLACEHOLDER }
            aria-invalid={ hostInput.error }
            aria-required
            aria-describedby="hostInputError"
            name = "hostName"
            id="hostName"
          />
          { hostInput.touched && hostInput.error &&
          <div
            className="text-danger"
            id="hostInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {hostInput.error}</div> }
        </div>

        <div
          className={
          (startInput.touched && startInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'
          }
        >
          <label htmlFor="start">{messages.EVENT_START_LABEL}<span title="required">*</span></label>
          <DateTimePicker { ...startInput }
            value={ startInput.value }
            min={ today }
            format={ "lll" }
            editFormat={ "lll" }
            parse={ str => new Date(str) }
            step={ 30 }
            onBlur={ () => startInput.onBlur(startInput.value) }
            onSelect={ (date) => this.handleDate(date, 'start') }
            required
            placeholder = { messages.EVENT_START_LABEL }
            disabled = { submitting }
            aria-invalid={ startInput.error }
            aria-required
            aria-describedby="startInputError"
            type="date"
            name="start"
            id="start"
          />
          <input { ...startStringInput }
            type="hidden"
            value={ startStringInput.value }
          />
          { startInput.touched && startInput.error &&
          <div
            className="text-danger"
            id="startInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {startInput.error}</div> }
        </div>

        <div
          className={
          (endInput.touched && endInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'
          }
        >
          <label htmlFor="end">{messages.EVENT_END_LABEL}<span title="required">*</span></label>
          <DateTimePicker { ...endInput }
            value={ endInput.value }
            min={ startInput.value }
            format={ "lll" }
            editFormat={ "lll" }
            parse={ str => new Date(str) }
            step={ 30 }
            onBlur={ () => endInput.onBlur(endInput.value) }
            onSelect={ (date) => this.handleDate(date, 'end') }
            required
            type="date"
            disabled = { submitting }
            placeholder = { messages.EVENT_END_LABEL }
            aria-invalid={ endInput.error }
            aria-required
            aria-describedby="endInputError"
            name="end"
            id="end"
          />
          <input { ...endStringInput }
            type="hidden"
            value={ endStringInput.value }
          />
          { endInput.touched && endInput.error &&
          <div
            className="text-danger"
            id="endInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {endInput.error}</div> }
        </div>

        <div
          className={
          (locationInput.touched && locationInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'
          }
        >
          <label
            htmlFor="location"
          >{messages.EVENT_LOCATION_LABEL}
            <span title="required">*</span>
          </label>
          <Geosuggest { ...locationInput }
            value={ locationInput.value }
            inputClassName="location form-control"
            required
            autoComplete="off"
            type = "text"
            disabled = { submitting }
            placeholder = { messages.EVENT_LOCATION_PLACEHOLDER }
            onBlur={ () => locationInput.onBlur(locationInput.value) }
            onSuggestSelect={ (suggest) => this.handleGeolocation(suggest) }
            aria-invalid={ locationInput.error }
            aria-required
            aria-describedby="locationInputError"
            name = "location"
            id="location"
          />
          <input { ...locationLatInput }
            type="hidden"
            value={ locationInput.value }
          />
          <input { ...locationLngInput }
            type="hidden"
            value={ locationInput.value }
          />
          { locationInput.touched && locationInput.error &&
          <div
            className="text-danger"
            id="locationInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {locationInput.error}</div> }
        </div>

        <div
          className={
          (guestsInput.touched && guestsInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'
          }
        >
          <label
            htmlFor="guest"
          >
            {messages.EVENT_GUESTS_LABEL}
            <span title="required">*</span>
          </label>
          <Combobox { ...guestsInput }
            value={ guestsInput.value }
            onBlur={ () => guestsInput.onBlur(guestsInput.value) }
            data = { eventGuestsList }
            required
            type="text"
            disabled = { submitting }
            placeholder = { messages.EVENT_GUESTS_PLACEHOLDER }
            suggest
            aria-invalid={ guestsInput.error }
            aria-required
            aria-describedby="guestsInputError"
            name="guests"
            id="guests"
          />
          { guestsInput.touched && guestsInput.error &&
          <div
            className="text-danger"
            id="guestsInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {guestsInput.error}</div> }
        </div>

        <hr />
        <div
          className={
          (descriptionInput.touched && descriptionInput.dirty && descriptionInput.error) ?
          'form-group has-error has-feedback' : 'form-group has-feedback'
          }
        >
          <label htmlFor="description">{messages.EVENT_DESCRIPTION_LABEL}</label>
          <textarea { ...descriptionInput }
            className="name form-control"
            disabled = { submitting }
            rows="3"
            placeholder = { messages.EVENT_DESCRIPTION_PLACEHOLDER }
            name = "description"
            id="description"
            aria-invalid={ descriptionInput.error }
            aria-required
            aria-describedby="descriptionInputError"
          ></textarea>
          { descriptionInput.touched && descriptionInput.dirty && descriptionInput.error &&
          <div
            className="text-danger"
            id="descriptionInputError"
            role="alert"
          >
            <span
              className="label label-danger"
            >error</span> {hostInput.error}</div> }
        </div>

        <button
          className="btn btn-primary btn-block" type="submit"
          disabled={ !valid || submitting }
        >{ submitting ? messages.SUBMITTING : messages.ADD_EVENT_TITLE }</button>
      </form>
    );
  }
}

AddEvent.propTypes = {
  fields: React.PropTypes.object.isRequired,
  asyncErrors: React.PropTypes.array.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  valid: React.PropTypes.bool.isRequired,
  fullName: React.PropTypes.string
};

export default reduxForm({
  form: 'addevent',
  fields,
  validate: addEventValidation
}, state => ({ // mapStateToProps
  initialValues: {
    hostInput: state.loggedUser.data.fullName === undefined ? '' : state.loggedUser.data.fullName
  }
}))(AddEvent);