import React from 'react';
import * as Components from 'components';

export default class AppLayout extends React.Component {
  render() {
    return (
      <div className="app-layout">
        <Components.AppNav/>
        <div className="container">
          { this.props.children }
        </div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  children: React.PropTypes.object
};