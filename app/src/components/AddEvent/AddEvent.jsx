import React from 'react';
import { reduxForm } from 'redux-form';
import messages from 'utils/messages';
import addEventValidation from './addEventValidation';
import MaskedInput from 'react-maskedinput';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import 'react-widgets/lib/less/react-widgets.less';
import Combobox from 'react-widgets/lib/Combobox';

const fields = [
  'nameInput',
];

class AddEvent extends React.Component {

  render() {
    const {
      fields: {
        nameInput
        },
      valid,
      handleSubmit,
      asyncErrors,
      asyncMessages,
      submitting
      } = this.props;

    const hostPopover = (
      <Popover id="hostPopover" title="Host tips">
        Could be an individual’s name or an organization
      </Popover>
    );

    const eventTypesList = ['Birthday party', 'Conference talk', 'Wedding'];

    return (
      <form onSubmit={ handleSubmit }>
        <p>{ messages.FIELDS_REQUIRED_EVENTS }</p>
        <div className={ (asyncErrors.length) ? 'alert alert-danger' : '' }>
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
        <div className={ (asyncMessages.length) ? 'alert alert-success' : '' }>
          <ul id="event-success" className="list-unstyled">
            {asyncMessages
              .map((message, key) =>
                <li
                  key={key}
                >
                  <span
                    className="label label-success"
                  >success</span> { message }
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
          <label htmlFor="name">{messages.EVENTNAME}*</label>
          <input { ...nameInput }
            className="name form-control"
            required
            autoFocus
            type = "text"
            disabled = { submitting }
            placeholder = { messages.EVENTNAME }
            name = "name"
          />
          { nameInput.touched && nameInput.dirty && nameInput.error &&
          <div
            className="text-danger"
          >
            <span
              className="label label-danger"
            >error</span> {nameInput.error}</div> }
        </div>

        <button
          className="btn btn-primary" type="submit"
          disabled={ !valid || submitting }
        >{ submitting ? messages.SUBMITTING : messages.ADD_EVENT_TITLE }</button>
      </form>
    );
  }
}

AddEvent.propTypes = {
  fields: React.PropTypes.object.isRequired,
  asyncErrors: React.PropTypes.array.isRequired,
  asyncMessages: React.PropTypes.array.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  valid: React.PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'addevent',
  fields,
  validate: addEventValidation
})(AddEvent);