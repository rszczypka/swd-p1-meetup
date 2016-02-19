import React from 'react';
import { connect } from 'react-redux';
import { AddEvent } from 'components';
import history from 'utils/history';
import messages from 'utils/messages';
import { submitNewEvent } from 'actions/events';

class AddEventPage extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(params) {
    if (!this.props.events.submitting) {
      return this.props.dispatch(submitNewEvent({
        name: params.nameInput
      }));
    }

    return this.props.dispatch(
      {
        type: 'DISPLAY_ERROR',
        error: 'Another event is being submitted at the same time'
      });
  }

  cancel() {
    history.replaceState(null, '/');
  }

  render() {
    return (
      <div className="addevent-form">
        <div className="page-header">
          <a href="#" className="pull-right btn btn-default btn-sm" onClick={ this.cancel }>
            {messages.CANCEL}
          </a>
          <h3>{messages.ADD_EVENT_TITLE}</h3>
        </div>
        <ul>
          <li>Type of the event (birthday party, conference talk, wedding, etc.)</li>
          <li>Event host (could be an individual’s name or an organization)</li>
          <li>Event start date and time</li>
          <li>Event end date and time</li>
          <li>Guest list</li>
          <li>Location</li>
          <li>Optional message to the guests with additional information about the event</li>
        </ul>
        <div className="well">
          <AddEvent
            onSubmit={ this.handleSubmit }
            asyncErrors={this.props.errors}
            asyncMessages={this.props.messages}
          />
        </div>
      </div>
    );
  }
}

AddEventPage.propTypes = {
  dispatch: React.PropTypes.func,
  errors: React.PropTypes.array,
  messages: React.PropTypes.array,
  cancel: React.PropTypes.func,
  events: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errors: state.errors.events,
    messages: state.messages.events,
    events: state.events
  };
}

export default connect(mapStateToProps)(AddEventPage);
