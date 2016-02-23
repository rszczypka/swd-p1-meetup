/* eslint new-cap:0, space-infix-ops:0, prefer-template:0 */
import React from 'react';
import Moment from 'moment';

export default class Event extends React.Component {

  render() {
    const event = this.props.event;

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h4>{ event.name }</h4>
          <p className="event-description">{ event.description }</p>
        </div>
        <div className="panel-footer text-center">
          <div className="event-dates">
            <div className="fa fa-clock-o" title="Event dates"></div>
            <div className="start-date">
              From { Moment(event.start).format('ddd, MMM Do YYYY, HH:mm') }
            </div>
            { event.start!==event.end && <div className="end-date">
              To { Moment(event.end).format('ddd, MMM Do YYYY, HH:mm') }
            </div> }
          </div>
          <div className="event-location event-details">
            <span className="fa fa-map-marker" title="Event location"></span>
            <span className="location">
              <a
                target="_blank"
                href={ 'https://www.google.com/maps/preview/@'+event.locationLat+','+event.locationLng+',8z' }
              > { event.location }
              </a>
            </span>
          </div>
          <div className="event-host event-details">
            <span className="fa fa-user" title="Event host"></span>
            <span className="host"> { event.host }</span>
          </div>
          <div className="event-guests event-details">
            <span className="fa fa-users" title="Event guests"></span>
            <span className="guests"> { event.guests }</span>
          </div>
          <div className="event-category event-details">
            <span className="label label-info" title="Event type">{ event.type }</span>
          </div>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  event: React.PropTypes.object.isRequired
};