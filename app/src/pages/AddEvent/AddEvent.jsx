import React from 'react';
import { connect } from 'react-redux';
import { AddEvent } from 'components';
import {browserHistory as history } from 'react-router';
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
        name: params.nameInput,
        type: params.typeInput,
        host: params.hostInput,
        start: params.startStringInput,
        end: params.endStringInput,
        guests: params.guestsInput,
        location: params.locationInput,
        locationLat: params.locationLatInput,
        locationLng: params.locationLngInput,
        description: params.descriptionInput || ''
      }));
    }

    return this.props.dispatch(
      {
        type: 'DISPLAY_ERROR',
        error: 'Another event is being submitted at the same time'
      });
  }

  cancel(e) {
    e.preventDefault();
    history.goBack() || history.push('/');
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
        <div className="well">
          <AddEvent
            onSubmit={ this.handleSubmit }
            asyncErrors={ this.props.errors || [] }
          />
        </div>
      </div>
    );
  }
}

AddEventPage.propTypes = {
  dispatch: React.PropTypes.func,
  errors: React.PropTypes.array,
  cancel: React.PropTypes.func,
  events: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errors: state.errors.events || [],
    events: state.events || {}
  };
}

export default connect(mapStateToProps)(AddEventPage);
