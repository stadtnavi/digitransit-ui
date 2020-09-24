import PropTypes from 'prop-types';
import React from 'react';

function SavedSearchesPanel() {
  return <div className="frontpage-panel fullscreen">Your saved searches.</div>;
}

SavedSearchesPanel.contextTypes = {
  config: PropTypes.object,
};

export default SavedSearchesPanel;
