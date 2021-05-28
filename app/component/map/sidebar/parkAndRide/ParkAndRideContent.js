import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import ParkAndRideAvailability from './ParkAndRideAvailability';
import ComponentUsageExample from '../../../ComponentUsageExample';
import SidebarContainer from '../SidebarContainer';

export default class ParkAndRidePopup extends React.Component {
  static contextTypes = { intl: intlShape.isRequired };

  static description = (
    <div>
      <p>Renders a citybike popup.</p>
      <ComponentUsageExample description="">
        <ParkAndRidePopup context="context object here">
          Im content of a citybike card
        </ParkAndRidePopup>
      </ComponentUsageExample>
    </div>
  );

  static propTypes = {
    realtime: PropTypes.bool.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    spacesAvailable: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <SidebarContainer
        name={this.context.intl.formatMessage({
          id: 'park-and-ride',
          defaultMessage: 'Park and Ride',
        })}
        description={this.props.name}
        icon="icon-icon_car"
      >
        <ParkAndRideAvailability
          realtime={this.props.realtime}
          maxCapacity={this.props.maxCapacity}
          spacesAvailable={this.props.spacesAvailable}
        />
      </SidebarContainer>
    );
  }
}
