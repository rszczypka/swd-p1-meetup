import React from 'react';
import messages from 'utils/messages';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class AppNav extends React.Component {

  render() {
    return (
      <Navbar inverse>
        <div className="container-fluid">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                { messages.TITLE }</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <li>
                <Link to="/" className="events" activeClassName="active" onlyActiveOnIndex>
                  { messages.EVENTS_TITLE }
                </Link>
              </li>
              <li>
                <Link to="/logout" className="logout" activeClassName="active">
                  { messages.UA_LOGOUT } <span className="fa fa-sign-out"></span>
                </Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

AppNav.propTypes = {
};