import React from 'react';
import messages from 'utils/messages';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class LandingNav extends React.Component {
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
                <Link to="/signup" className="signup underline">
                {messages.LANDING_SIGNUP}</Link>
              </li>
              <li>
                <Link to="/login" className="login">
                {messages.LANDING_LOGIN}</Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

LandingNav.propTypes = {
};