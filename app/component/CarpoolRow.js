import React from 'react';
import PropTypes from 'prop-types';
import ExternalLinkDecoration from './ExternalLinkDecoration';
import Icon from './Icon';

function CarpoolRow({ departure, iconWidth }) {
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
          <Icon img="fg_icon" height={iconWidth} width={iconWidth} />
          <Icon img="adac_icon" height={iconWidth} width={iconWidth} />
        </a>
        {iconWidth >= 1 ? <ExternalLinkDecoration /> : null}
      </span>
    );
  }
  return <Icon img="icon-icon_carpool" />;
}

CarpoolRow.propTypes = {
  departure: PropTypes.object.isRequired,
  iconWidth: PropTypes.number.isRequired,
};

export default CarpoolRow;
