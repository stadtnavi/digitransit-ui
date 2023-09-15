import React from 'react';
import PropTypes from 'prop-types';
import Link from 'found/Link';
import Icon from '../../Icon';
import ParkandRideForBikes from './ParkAndRideForBikes.bbnavi';
import { PREFIX_BIKEPARK } from '../../../util/path';

export default function SelectBikeParkRow(props, { intl }) {
  const img = ParkandRideForBikes.getIcon(props);
  const { name, bikeParkId } = props;

  function cleanName(otpBikeparkName) {
    const cleaned = otpBikeparkName.replace('Bicycle parking', '').trim();
    if (cleaned.length) {
      return cleaned;
    }
    return intl.formatMessage({
      id: 'bicycle-parking',
      defaultMessage: 'Bicycle parking',
    });
  }

  return (
    <Link
      className="stop-popup-choose-row"
      to={`/${PREFIX_BIKEPARK}/${encodeURIComponent(bikeParkId)}`}
    >
      <span className="choose-row-left-column" aria-hidden="true">
        <Icon img={img} />
      </span>
      <span className="choose-row-center-column">
        <h5 className="choose-row-header">{cleanName(name)}</h5>
      </span>
      <span className="choose-row-right-column">
        <Icon img="icon-icon_arrow-collapse--right" />
      </span>
    </Link>
  );
}

SelectBikeParkRow.propTypes = {
  bikeParkId: PropTypes.string,
  name: PropTypes.string,
};

SelectBikeParkRow.contextTypes = {
  intl: PropTypes.object.isRequired,
};
