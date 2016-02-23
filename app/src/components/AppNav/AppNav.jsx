import React from 'react';
import messages from 'utils/messages';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class AppNav extends React.Component {
  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
    this.collapse = this.collapse.bind(this);
  }

  collapse() {
    return this.setState({ expanded: false });
  }

  handleToggle() {
    if (this.state !== null) {
      return this.setState({ expanded: !this.state.expanded });
    }
    return this.setState({ expanded: true });
  }

  render() {
    return (
      <Navbar
        inverse
        expanded={ this.state === null ? false : this.state.expanded }
        onToggle={ this.handleToggle }
      >
        <div className="container-fluid">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" onClick={ this.collapse }>
                { messages.TITLE }</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="navbar-right">
              <li>
                <Link
                  to="/"
                  className="events"
                  onClick={ this.collapse }
                  activeClassName="active"
                  onlyActiveOnIndex
                >
                  { messages.EVENTS_TITLE }
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  onClick={ this.collapse }
                  className="logout"
                  activeClassName="active"
                >
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