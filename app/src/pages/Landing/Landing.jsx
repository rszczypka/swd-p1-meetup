import React from 'react';
import { SignUp } from 'pages';

class Landing extends React.Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-box"><SignUp/></div>
      </div>
    );
  }
}

Landing.propTypes = {
};

export default Landing;