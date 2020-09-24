import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';
import SavedSearchesTabLabel from './SavedSearchesTabLabel';
import OfferedRidesTabLabelContainer from './OfferedRidesTabLabelContainer';

const FrontPagePanelSmall = ({
  selectedPanel,
  savedSearchesClicked,
  offeredRidesClicked,
  mapExpanded,
  children,
  //  location,
}) => {
  const tabClasses = ['hover'];
  const savedSearchesClasses = ['h4'];
  const offeredRidesClasses = ['h4'];

  if (selectedPanel === 1) {
    savedSearchesClasses.push('selected');
  } else {
    offeredRidesClasses.push('selected');
  }

  const content = selectedPanel && (
    <div
      className={cx([
        'frontpage-panel-wrapper',
        'no-select',
        'small',
        { 'expanded-panel': mapExpanded },
      ])}
      key="panel"
    >
      {children}
    </div>
  );

  return (
    <div
      className={cx(['frontpage-panel-container', 'no-select'], {
        expanded: mapExpanded,
      })}
    >
      <ul
        className={cx([
          'tabs-row',
          'cursor-pointer',
          {
            expanded: mapExpanded,
          },
        ])}
      >
        <SavedSearchesTabLabel
          classes={cx(tabClasses, savedSearchesClasses)}
          onClick={savedSearchesClicked}
        />
        <OfferedRidesTabLabelContainer
          classes={cx(tabClasses, offeredRidesClasses)}
          onClick={offeredRidesClicked}
        />
      </ul>
      {content}
    </div>
  );
};

const noop = () => {};

FrontPagePanelSmall.displayName = 'FrontPagePanelSmall';

FrontPagePanelSmall.description = () => (
  <div>
    <p>Front page tabs for small display.</p>
    <ComponentUsageExample description="Front page tabs">
      <FrontPagePanelSmall
        closePanel={noop}
        favouritesClicked={noop}
        nearbyClicked={noop}
      />
    </ComponentUsageExample>
  </div>
);

FrontPagePanelSmall.defaultProps = {
  selectedPanel: 1,
  children: null,
};

FrontPagePanelSmall.propTypes = {
  selectedPanel: PropTypes.oneOf([1, 2]),
  savedSearchesClicked: PropTypes.func.isRequired,
  offeredRidesClicked: PropTypes.func.isRequired,
  mapExpanded: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default FrontPagePanelSmall;
