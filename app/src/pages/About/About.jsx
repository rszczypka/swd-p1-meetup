import React from 'react';
import { connect } from 'react-redux';
import messages from 'utils/messages';

class About extends React.Component {

  render() {
    return (
      <div className="about">
        <h1>{messages.WELCOME}</h1>
        <p>{messages.FEED_TEMPORAL}</p>
        <p>{messages.IDEAS}</p>
      </div>
    );
  }
}

About.propTypes = {
  dispatch: React.PropTypes.func
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(About);
