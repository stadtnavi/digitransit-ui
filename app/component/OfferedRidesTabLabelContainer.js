import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from './Icon';

export default function OfferedRidesTabLabelContainer({ classes, onClick }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/click-events-have-key-events
    <li className={classes} onClick={onClick} role="button">
      <Icon className="prefix-icon" img="icon-icon_save" />
      <FormattedMessage
        id="your-offered-rides"
        defaultMessage="Offered rides"
      />
    </li>
  );
}

OfferedRidesTabLabelContainer.propTypes = {
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
