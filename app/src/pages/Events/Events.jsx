import React from 'react';
import { connect } from 'react-redux';
import messages from 'utils/messages';
import { Link } from 'react-router';
import { Event } from 'components';

class EventsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var p = this.props;
    const rows = Object.keys(p.events).map(function (key, i) {
      return (
        <div>
          <Event
          key={ key }
          event={ p.events[key] }
          />
        </div>
      );
    }).reverse();
    const noEvents = (
      <div className="no-events text-center">
        <div className="well well-sm">
          <p>
            <i className="fa fa-3x fa-calendar-times-o text-muted"></i>
          </p>
          <p>{ messages.NOEVENTS + this.props.hasreceiveddata.toString() }</p>
          <Link to="/add-event" className="btn btn-primary">
            <i className="fa fa-plus-square"></i> {messages.ADD_EVENT_TITLE}
          </Link>
        </div>
      </div>
    );

    if(!this.props.hasreceiveddata) {
      return (
        <div className="events">
          <div className="page-header">
            <h3>{messages.EVENTS_TITLE}</h3>
          </div>
          { noEvents }
        </div>
      )
    }
    return (
      <div className="events">
        <div className="page-header">
          <Link to="/add-event" className="btn btn-primary btn-sm pull-right">
            <i className="fa fa-plus-square"></i> {messages.ADD_EVENT_TITLE}
          </Link>
          <h3>{messages.EVENTS_TITLE}</h3>
        </div>
        { rows }
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    events: state.events.data || {},
    hasreceiveddata: state.events.hasreceiveddata || false
  };
}

export default connect(mapStateToProps)(EventsPage);