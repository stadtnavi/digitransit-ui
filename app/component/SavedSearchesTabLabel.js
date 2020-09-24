import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from './Icon';

export default function SavedSearchesTabLabel({ classes, onClick }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/click-events-have-key-events
    <li className={classes} onClick={onClick} role="button">
      <Icon className="prefix-icon" img="icon-icon_save" />
      <FormattedMessage id="saved-searches" defaultMessage="Saved searches" />
    </li>
  );
}

SavedSearchesTabLabel.propTypes = {
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
