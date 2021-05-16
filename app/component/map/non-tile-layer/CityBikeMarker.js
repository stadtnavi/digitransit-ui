import PropTypes from 'prop-types';
import React from 'react';
import { routerShape } from 'found';
import Icon from '../../Icon';
import GenericMarker from '../GenericMarker';
import { station as exampleStation } from '../../ExampleData';
import ComponentUsageExample from '../../ComponentUsageExample';
import {
  BIKEAVL_UNKNOWN,
  getCityBikeNetworkConfig,
  getCityBikeNetworkIcon,
  getCityBikeNetworkId,
} from '../../../util/citybikes';
import { isBrowser } from '../../../util/browser';
import {
  getCityBikeAvailabilityIndicatorColor,
  getCityBikeAvailabilityTextColor,
} from '../../../util/legUtils';

import { PREFIX_BIKESTATIONS } from '../../../util/path';

let L;

/* eslint-disable global-require */
// TODO When server side rendering is re-enabled,
//      these need to be loaded only when isBrowser is true.
//      Perhaps still using the require from webpack?
if (isBrowser) {
  L = require('leaflet');
}
/* eslint-enable global-require */

// Small icon for zoom levels <= 15
const smallIconSvg = `
  <svg viewBox="0 0 8 8">
    <circle class="stop-small" cx="4" cy="4" r="3" stroke-width="1"/>
  </svg>
`;

export default class CityBikeMarker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static description = (
    <div>
      <p>Renders a citybike marker</p>
      <ComponentUsageExample description="">
        <CityBikeMarker
          key={exampleStation.id}
          map="leaflet map here"
          station={exampleStation}
        />
      </ComponentUsageExample>
    </div>
  );

  static displayName = 'CityBikeMarker';

  static propTypes = {
    showBikeAvailability: PropTypes.bool,
    station: PropTypes.object.isRequired,
    transit: PropTypes.bool,
  };

  static contextTypes = {
    config: PropTypes.object.isRequired,
    router: routerShape.isRequired,
  };

  static defaultProps = {
    showBikeAvailability: false,
  };

  static contextTypes = {
    config: PropTypes.object.isRequired,
    router: routerShape.isRequired,
  };

  handleClick() {
    const { stationId } = this.props.station;
    this.context.router.push(
      `/${PREFIX_BIKESTATIONS}/${encodeURIComponent(stationId)}`,
    );
  }

  getIcon = zoom => {
    const { showBikeAvailability, station, transit } = this.props;
    const { config } = this.context;

    const iconName = getCityBikeNetworkIcon(
      getCityBikeNetworkConfig(getCityBikeNetworkId(station.networks), config),
    );

    return !transit && zoom <= config.stopsSmallMaxZoom
      ? L.divIcon({
          html: smallIconSvg,
          iconSize: [8, 8],
          className: 'citybike cursor-pointer',
        })
      : L.divIcon({
          html: showBikeAvailability
            ? Icon.asString({
                img: iconName,
                className: 'city-bike-medium-size',
                badgeFill: getCityBikeAvailabilityIndicatorColor(
                  station.bikesAvailable,
                  config,
                ),
                badgeTextFill: getCityBikeAvailabilityTextColor(
                  station.bikesAvailable,
                  config,
                ),
                badgeText:
                  this.context.config.cityBike.capacity !== BIKEAVL_UNKNOWN
                    ? station.bikesAvailable
                    : null,
              })
            : Icon.asString({
                img: iconName,
                className: 'city-bike-medium-size',
              }),
          iconSize: [20, 20],
          className: 'citybike cursor-pointer',
        });
  };

  render() {
    if (!isBrowser) {
      return false;
    }
    return (
      <GenericMarker
        position={{
          lat: this.props.station.lat,
          lon: this.props.station.lon,
        }}
        onClick={this.handleClick}
        getIcon={this.getIcon}
        id={this.props.station.stationId}
      />
    );
  }
}
