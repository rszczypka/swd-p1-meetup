import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/auth';

class LogoutPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(logout());
  }
  render() {
    return (
      <div>
        <p>Logout</p>
      </div>
    );
  }
}

LogoutPage.propTypes = {
  dispatch: React.PropTypes.func
};

export default connect()(LogoutPage);
