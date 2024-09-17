import PropTypes from 'prop-types';
import React from 'react';

import { FormattedMessage } from 'react-intl';

const SelectedStopPopupContent = ({ stop }) => (
  <div className="origin-popup">
    <div className="origin-popup-header">
      <div className="selected-stop-header">
        {!stop.name || stop.networks[0] === 'tier_REUTLINGEN' ? (
          <FormattedMessage
            id={`${stop.networks}-station-no-id`}
            defaultMessage="Station"
          />
        ) : (
          stop.name
        )}
      </div>
    </div>
    {(stop.code || stop.desc) && (
      <div>
        <div className="origin-popup-name">
          <div className="selected-stop-popup">
            {stop.code && <p className="card-code">{stop.code}</p>}
            <span className="description">{stop.desc}</span>
          </div>
        </div>
        <div className="shade-to-white" />
      </div>
    )}
  </div>
);

SelectedStopPopupContent.propTypes = {
  stop: PropTypes.object.isRequired,
  networks: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
};

SelectedStopPopupContent.displayName = 'SelectedStopPopupContent';

export default SelectedStopPopupContent;
