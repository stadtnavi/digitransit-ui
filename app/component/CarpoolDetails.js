import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const CarpoolDetails = props => {
  return (
    <table id="carpool-details">
      <tbody>
        <tr>
          <td>
            <FormattedMessage
              defaultMessage="Coordinates"
              id="carpool-coords"
            />
          </td>
          <td>
            N{props.lat}°, E{props.lon}°
          </td>
        </tr>
        <tr>
          <td>
            <FormattedMessage defaultMessage="Direction" id="carpool-dir" />
          </td>
          <td>Demo</td>
        </tr>
        <tr>
          <td>
            <FormattedMessage
              defaultMessage="Parking Spaces"
              id="carpool-parkings"
            />
          </td>
          <td>20 (Demo)</td>
        </tr>
      </tbody>
    </table>
  );
};

CarpoolDetails.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
};

export default CarpoolDetails;
