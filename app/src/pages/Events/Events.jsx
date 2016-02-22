import React from 'react';
import { connect } from 'react-redux';
import messages from 'utils/messages';
import { Link } from 'react-router';
import { Event } from 'components';
import { Alert } from 'react-bootstrap';
import { dismissAlert } from 'actions/events';
import ReactDOM from 'react-dom';

class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  componentDidMount(){
    if(this.refs.successAlert){
      ReactDOM.findDOMNode(this.refs.successAlert).focus();
    }
  }

  handleAlertDismiss() {
    return this.props.dispatch(dismissAlert());
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

    const loadingEvents = (
      <div className="text-center">
        <div className="well well-sm">
          <p>
            <i className="fa fa-3x fa-spinner fa-spin"></i>
          </p>
          <p>{ messages.LOADINGEVENTS }</p>
        </div>
      </div>
    );

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

    if(!this.props.hasreceiveddata) {
      return (
        <div className="events">
          <div className="page-header">
            <h3>{messages.EVENTS_TITLE}</h3>
          </div>
          { loadingEvents }
        </div>
      )
    }
    if(this.props.hasreceiveddata && this.props.events.length === 0) {
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
        { this.props.asyncMessages.alertVisible &&
        <Alert ref="successAlert" role="alert" bsStyle="success" onDismiss={this.handleAlertDismiss} dismissAfter={5000}>
            {this.props.asyncMessages.messages
              .map((message, key) =>
                <span
                  key={key}
                >
                  <span
                    className="label label-success"
                  >success</span> { message }
                </span>
              )
            }
        </Alert> }
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
    events: state.events.data,
    asyncMessages: state.messages,
    hasreceiveddata: state.events.hasreceiveddata
  };
}

export default connect(mapStateToProps)(EventsPage);
