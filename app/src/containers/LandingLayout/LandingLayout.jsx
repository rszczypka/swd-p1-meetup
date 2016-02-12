import React from 'react';
import messages from 'utils/messages';
import * as Components from 'components';

export default class LandingLayout extends React.Component {
  render() {
    return (
      <div className="landing-layout">
        <Components.LandingNav/>
        <div className="container">
        {this.props.children}
        </div>
      </div>
    );
  }
}

LandingLayout.propTypes = {
  children: React.PropTypes.object
};

