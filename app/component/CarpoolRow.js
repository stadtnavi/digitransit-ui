import React from 'react';
import PropTypes from 'prop-types';
import ExternalLinkDecoration from './ExternalLinkDecoration';
import Icon from './Icon';

function CarpoolRow({ departure }) {
  if (departure.pattern.route.agency.name === 'Fahrgemeinschaft.de') {
    return (
      <span className="carpool-link">
        <a
          onClick={e => {
            e.stopPropagation();
          }}
          href="https://fahrgemeinschaft.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon img="fg_icon" height="1.25" width="1.25" />
          <Icon img="adac_icon" height="1.25" width="1.25" />
        </a>
        <ExternalLinkDecoration />
      </span>
    );
  }
  return <Icon img="icon-icon_carpool" />;
}

CarpoolRow.propTypes = {
  departure: PropTypes.object.isRequired,
};

export default CarpoolRow;
