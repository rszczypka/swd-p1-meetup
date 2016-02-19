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
                {messages.TITLE}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <li>
                <Link to="/" className="events" onlyActiveOnIndex>
                  {messages.EVENTS_TITLE}</Link>
              </li>
              <li>
                <Link to="/about" className="about">
                  {messages.ABOUT_TITLE}</Link>
              </li>
              <li>
                <Link to="/logout" className="logout">
                {messages.UA_LOGOUT}</Link>
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