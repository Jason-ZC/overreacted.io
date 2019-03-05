import React from 'react';
import profilePic from '../assets/user.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={profilePic}
          alt={`Jason Zhour`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 260 }}>
          Personal blog by{' '}
          <a href="https://mobile.twitter.com/JasonZhour">Jason Zhour</a>
          .&nbsp;&nbsp; 偷得浮生半日闲，心情半佛半神仙。
        </p>
      </div>
    );
  }
}

export default Bio;
