import React from 'react';
import messages from 'utils/messages';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class LandingNav extends React.Component {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
  }

  getInitialState(){
    return { expanded: false};
  }

  handleToggle (e) {
    if(this.state === null) return this.setState({ expanded: false });
    return this.setState({ expanded: !this.state.expanded })
  }

  render() {
    return (
      <Navbar inverse expanded={ this.state.expanded } onToggle={ this.handleToggle }>
          <Navbar.Header>
            <Navbar.Brand  onClick={ this.handleToggle }>
              <Link to="/">
                {messages.TITLE}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="navbar-right">
              <li onClick={ this.handleToggle }>
                <Link to="/signup" className="signup underline">
                {messages.LANDING_SIGNUP}</Link>
              </li>
              <li onClick={ this.handleToggle }>
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