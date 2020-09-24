import PropTypes from 'prop-types';
import React from 'react';

function OfferedRidesPanel() {
  return <div className="frontpage-panel fullscreen">Your offered rides.</div>;
}

OfferedRidesPanel.contextTypes = {
  config: PropTypes.object,
};

export default OfferedRidesPanel;
