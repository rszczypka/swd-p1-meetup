import React from 'react';
import { connect } from 'react-redux';
import messages from 'utils/messages';
import { loadEvents } from 'actions/events';
import { Link } from 'react-router';

function loadData(props) {
  props.loadEvents();
}


class EventsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { events } = this.props;
    const noEvents = (
      <div className="no-events text-center">
        <div className="well well-sm">
          <p>
            <i className="fa fa-3x fa-calendar-times-o text-muted"></i>
          </p>
          <p>{ messages.NOEVENTS }</p>
          <Link to="/add-event" className="btn btn-primary">
            <i className="fa fa-plus-square"></i> {messages.ADD_EVENT_TITLE}
          </Link>
        </div>
      </div>
    );

    /*if(!events) {
      return noEvents;
    }*/
    return (
      <div className="events">
        <div className="page-header">
          <Link to="/add-event" className="btn btn-primary btn-sm pull-right">
            <i className="fa fa-plus-square"></i> {messages.ADD_EVENT_TITLE}
          </Link>
          <h3>{messages.EVENTS_TITLE}</h3>
        </div>
        <div className="panel panel-default">
          <div className="panel-body">
            <h4><a href="">My first event</a></h4>
            <p className="event-description">There is a big birthday party going on soon
              and you are all warmly invited. Please RSVP before 20 Mar, 2016. Thank you.</p>
          </div>
          <div className="panel-footer text-center">
              <div className="event-dates">
                <span className="fa fa-clock-o" title="Event dates"></span>
                <span className="start-date"> 26 Mar 2016, 9.00am </span>
                -<span className="start-date"> 28 Mar 2016, 4.30pm</span>
              </div>
              <div className="event-location event-details">
                <span className="fa fa-map-marker" title="Event location"></span>
                <span className="location"> Dublin, Ireland</span>
              </div>
              <div className="event-host event-details">
                <span className="fa fa-user" title="Event host"></span>
                <span className="host"> Paul Smith</span>
              </div>
              <div className="event-category event-details">
                <span className="label label-info">Birthday party</span>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

EventsPage.propTypes = {
  events: React.PropTypes.array.isRequired,
  loadEvents: React.PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(EventsPage);
