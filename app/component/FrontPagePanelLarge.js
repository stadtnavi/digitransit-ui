import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import SavedSearchesTabLabel from './SavedSearchesTabLabel';
import OfferedRidesTabLabelContainer from './OfferedRidesTabLabelContainer';
import ComponentUsageExample from './ComponentUsageExample';

const FrontPagePanelLarge = ({
  selectedPanel,
  savedSearchesClicked,
  offeredRidesClicked,
  children,
}) => {
  const tabClasses = ['bp-large', 'h4'];
  const savedSearchesClasses = [];
  const offeredRidesClasses = [];

  if (selectedPanel === 1) {
    savedSearchesClasses.push('selected');
  } else {
    offeredRidesClasses.push('selected');
  }

  return (
    <div className="fpcfloat no-select">
      <ul className="tabs-row bp-large cursor-pointer">
        <SavedSearchesTabLabel
          classes={cx(tabClasses, savedSearchesClasses)}
          onClick={savedSearchesClicked}
        />
        <OfferedRidesTabLabelContainer
          classes={cx(tabClasses, offeredRidesClasses)}
          onClick={offeredRidesClicked}
        />
      </ul>
      {children}
    </div>
  );
};

const noop = () => {};

FrontPagePanelLarge.displayName = 'FrontPagePanelLarge';

FrontPagePanelLarge.description = () => (
  <div>
    <p>Front page tabs for large display.</p>
    <div style={{ width: '340px' }}>
      <ComponentUsageExample description="Front page tabs">
        <FrontPagePanelLarge
          selectedPanel={2}
          nearbyClicked={noop}
          favouritesClicked={noop}
        />
      </ComponentUsageExample>
    </div>
  </div>
);

FrontPagePanelLarge.propTypes = {
  selectedPanel: PropTypes.oneOf([1, 2]),
  savedSearchesClicked: PropTypes.func.isRequired,
  offeredRidesClicked: PropTypes.func.isRequired,
  children: PropTypes.node,
};

FrontPagePanelLarge.defaultProps = {
  selectedPanel: 1,
  children: null,
};

export default FrontPagePanelLarge;
