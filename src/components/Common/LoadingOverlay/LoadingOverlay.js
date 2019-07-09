import React from 'react';

import './style.css';

import ContentLoader from 'react-content-loader';

const HeaderLoader = () => (
  <ContentLoader height={200} width={400}>
    <rect x="0" y="0" width="400" height="200" />
  </ContentLoader>
);

const ItemsLoader = () => (
  <ContentLoader>
    <rect x="20" y="20" rx="4" ry="4" width="300" height="13" />
    <rect x="20" y="50" rx="3" ry="3" width="250" height="10" />
    <rect x="20" y="80" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

const LoadingOverlay = ({ loading }) => {
  let visibleStyle = {};

  if (loading) {
    visibleStyle = {
      opacity: 1,
      visibility: 'visible'
    };
  }

  return (
    <div className="loading-overlay" style={visibleStyle}>
      <div>
        <HeaderLoader />
        <ItemsLoader />
        <ItemsLoader />
        <ItemsLoader />
      </div>
    </div>
  );
};

export default LoadingOverlay;
