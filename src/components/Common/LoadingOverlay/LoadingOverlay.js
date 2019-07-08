import React from 'react';
import Spinner from 'react-spinkit';

import './style.css';

const LoadingOverlay = ({ loading }) => {
  let visibleStyle = {};

  if(loading) {
    visibleStyle = {
      opacity: 1,
      visibility: 'visible'
    };
  }

  return (
    <div className="loading-overlay" style={visibleStyle}>
      <Spinner name="ball-pulse-rise" fadeIn="none" color="white"/>
    </div>
  )
};

export default LoadingOverlay;