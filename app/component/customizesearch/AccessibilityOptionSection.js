import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Toggle from './Toggle';
import { saveRoutingSettings } from '../../action/SearchSettingsActions';
import Icon from '../Icon';
import { addAnalyticsEvent } from '../../util/analyticsUtils';

const AccessibilityOptionSection = (
  { currentSettings },
  { config, executeAction },
) => {
  const onToggle = () => {
    addAnalyticsEvent({
      category: 'ItinerarySettings',
      action: `Settings${
        currentSettings.accessibilityOption ? 'Disable' : 'Enable'
      }WheelChair`,
      name: null,
    });
    executeAction(saveRoutingSettings, {
      accessibilityOption: !currentSettings.accessibilityOption,
    });
  };
  const accessibilityOptionDisabled =
    config.accessibilityRoutingDisabled === true;
  return (
    <fieldset>
      <legend className="accessibility-header settings-header">
        <FormattedMessage id="accessibility" defaultMessage="Accessibility" />
      </legend>
      {accessibilityOptionDisabled ? (
        <>
          <div className="accessibility-routing-disabled-notice">
            <FormattedMessage
              id="accessibility-routing-disabled"
              defaultMessage="Due to a lack of data on accessibility, we are unfortunately unable to provide any barrier-free routes at the moment."
            />
          </div>
        </>
      ) : (
        <div className="mode-option-container toggle-container accessibility-container">
          {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
          <label
            htmlFor="settings-toggle-accessibility"
            className="toggle-label"
          >
            <Icon
              className="wheelchair-icon"
              img="icon-icon_wheelchair"
              height={2}
              width={2}
            />
            <span className="accessibility-label">
              <FormattedMessage
                id="accessibility-limited"
                defaultMessage="Wheelchair"
              />
            </span>
            <Toggle
              id="settings-toggle-accessibility"
              toggled={!!currentSettings.accessibilityOption}
              title="accessibility"
              onToggle={() => onToggle()}
            />
          </label>
        </div>
      )}
    </fieldset>
  );
};

AccessibilityOptionSection.propTypes = {
  currentSettings: PropTypes.object.isRequired,
};

AccessibilityOptionSection.contextTypes = {
  config: PropTypes.object.isRequired,
  executeAction: PropTypes.func.isRequired,
};

export default AccessibilityOptionSection;
