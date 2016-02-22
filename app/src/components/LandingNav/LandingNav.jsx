import React from 'react';
import messages from 'utils/messages';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class LandingNav extends React.Component {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
    this.collapse = this.collapse.bind(this);
  }

  collapse (e) {
    return this.setState({ expanded: false });
  }

  handleToggle (e) {
    if(this.state !== null) {
      return this.setState({ expanded: !this.state.expanded })
    }
    return this.setState({ expanded: true })
  }

  render() {
    return (
      <Navbar inverse expanded={ this.state === null ? false : this.state.expanded } onToggle={ this.handleToggle }>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" onClick={ this.collapse }>
                {messages.TITLE}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="navbar-right">
              <li onClick={ this.collapse }>
                <Link to="/signup" className="signup underline">
                {messages.LANDING_SIGNUP}</Link>
              </li>
              <li onClick={ this.collapse }>
                <Link to="/login" className="login">
                {messages.LANDING_LOGIN}</Link>
              </li>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}

LandingNav.propTypes = {
};