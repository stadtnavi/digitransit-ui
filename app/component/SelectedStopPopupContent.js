import PropTypes from 'prop-types';
import React from 'react';

import { FormattedMessage } from 'react-intl';

const SelectedStopPopupContent = ({ stop, citybike }) => (
  <div className="origin-popup">
    <div className="origin-popup-header">
      <div className="selected-stop-header">
        {!stop.name && citybike ? (
          <FormattedMessage
            id="tier-reutlingen-station-no-id"
            defaultMessage="Scooter"
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
  citybike: PropTypes.bool,
};

SelectedStopPopupContent.defaultProps = {
  citybike: false,
};

SelectedStopPopupContent.displayName = 'SelectedStopPopupContent';

export default SelectedStopPopupContent;
