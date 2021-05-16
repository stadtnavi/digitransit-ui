import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import BikeParks from './BikeParks';

export default function SelectBikeParkRow(props) {
  const { selectRow, properties } = props;
  const icon = BikeParks.getIcon(properties);
  return (
    <div className="no-margin">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className="cursor-pointer select-row" onClick={selectRow}>
        <div className="padding-vertical-normal select-row-icon">
          <Icon img={icon} viewBox="0 0 18 18" />
        </div>
        <div className="padding-vertical-normal select-row-text">
          <span className="header-primary no-margin link-color">
            {properties.name}
          </span>
        </div>
        <div className="clear" />
      </div>
      <hr className="no-margin gray" />
    </div>
  );
}

SelectBikeParkRow.propTypes = {
  selectRow: PropTypes.func.isRequired,
  properties: PropTypes.object.isRequired,
};

SelectBikeParkRow.contextTypes = {
  intl: PropTypes.object.isRequired,
};
