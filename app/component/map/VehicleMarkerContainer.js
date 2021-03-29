import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import IconWithTail from '../IconWithTail';
import IconMarker from './IconMarker';

import { isBrowser } from '../../util/browser';
import Icon from '../Icon';
import CardHeader from '../CardHeader';

const MODES_WITH_ICONS = ['bus', 'tram', 'rail', 'subway', 'ferry'];

// eslint-disable-next-line no-unused-vars
let Popup;

const iconSuffix = occupancyStatus => {
  switch (occupancyStatus) {
    case 'STANDING_ROOM_ONLY':
      return 'red';
    case 'FEW_SEATS_AVAILABLE':
      return 'orange';
    default:
      return 'green';
  }
};

const makeSmallIcon = (heading, useSmallIcon) => {
  return {
    element: (
      <IconWithTail
        img="icon-icon_all-vehicles-small"
        rotate={heading}
        allVehicles
      />
    ),
    className: `vehicle-icon bus ${useSmallIcon ? 'small-map-icon' : ''}`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  };
};

function getVehicleIcon(
  mode,
  heading,
  vehicleNumber,
  useSmallIcon = false,
  useLargeIcon = false,
  occupancyStatus,
) {
  if (!isBrowser) {
    return null;
  }
  if (!mode) {
    return useLargeIcon
      ? {
          element: (
            <IconWithTail
              img="icon-icon_all-vehicles-large"
              rotate={heading}
              allVehicles
              vehicleNumber={vehicleNumber}
              useLargeIcon={useLargeIcon}
            />
          ),
          className: `vehicle-icon bus ${useSmallIcon ? 'small-map-icon' : ''}`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        }
      : makeSmallIcon(heading, useSmallIcon);
  }
  if (MODES_WITH_ICONS.indexOf(mode) !== -1) {
    if (useLargeIcon) {
      const icon = `icon-icon_bus-live-${iconSuffix(occupancyStatus)}`;
      return {
        element: <IconWithTail img={icon} rotate={heading} useLargeIcon />,
        className: `vehicle-icon ${mode} ${
          useSmallIcon ? 'small-map-icon' : ''
        }`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      };
    }
    return makeSmallIcon(heading, useSmallIcon);
  }

  return {
    element: <IconWithTail img="icon-icon_bus-live" rotate={heading} />,
    className: `vehicle-icon bus ${useSmallIcon ? 'small-map-icon' : ''}`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  };
}

if (isBrowser) {
  /* eslint-disable global-require */
  Popup = require('react-leaflet/es/Popup').default;
  /* eslint-enable global-require */
}

// if tripStartTime has been specified,
// use only the updates for vehicles with matching startTime

function shouldShowVehicle(message, direction, tripStart, pattern, headsign) {
  return (
    !Number.isNaN(parseFloat(message.lat)) &&
    !Number.isNaN(parseFloat(message.long)) &&
    (pattern === undefined ||
      pattern.substr(0, message.route.length) === message.route) &&
    (headsign === undefined ||
      message.headsign === undefined ||
      headsign === message.headsign) &&
    (direction === undefined ||
      message.direction === undefined ||
      message.direction === direction) &&
    (tripStart === undefined ||
      message.tripStartTime === undefined ||
      message.tripStartTime === tripStart)
  );
}

const drawOccupancy = status => {
  let suffix;
  switch (status) {
    case 'STANDING_ROOM_ONLY':
      suffix = 'high';
      break;
    case 'FEW_SEATS_AVAILABLE':
      suffix = 'medium';
      break;
    default:
      suffix = 'low';
      break;
  }
  return (
    // eslint-disable-next-line react/no-array-index-key
    <Icon img={`occupancy-${suffix}`} height={1.2} width={1.2} />
  );
};

function VehicleMarkerContainer(props) {
  return Object.entries(props.vehicles)
    .filter(([, message]) =>
      shouldShowVehicle(
        message,
        props.direction,
        props.tripStart,
        props.pattern,
        props.headsign,
      ),
    )
    .map(([id, message]) => {
      const icon = getVehicleIcon(
        props.ignoreMode ? null : message.mode,
        message.heading,
        message.shortName ? message.shortName : message.route.split(':')[1],
        false,
        props.useLargeIcon,
        message.occupancyStatus,
      );
      return (
        <IconMarker
          key={id}
          position={{
            lat: message.lat,
            lon: message.long,
          }}
          zIndexOffset={100}
          icon={icon}
        >
          <Popup
            offset={[106, 0]}
            maxWidth={250}
            minWidth={250}
            className="vehicle-popup"
          >
            <div className="card occupancy-card">
              <div className="padding-normal">
                <CardHeader
                  name="Bus"
                  descClass="padding-vertical-small"
                  unlinked
                  className="padding-medium"
                  icon={`icon-icon_bus-live-${iconSuffix(
                    message.occupancyStatus,
                  )}`}
                  headingStyle="h2"
                />
                <div className="occupancy-icon">
                  {drawOccupancy(message.occupancyStatus)}
                </div>
                <div>
                  <FormattedMessage
                    id={`occupancy-status-${message.occupancyStatus}`}
                    defaultMessage={message.occupancyStatus}
                  />
                </div>
              </div>
            </div>
            {/** <Relay.RootContainer
           Component={message.tripId ? TripMarkerPopup : FuzzyTripMarkerPopup}
           route={
              message.tripId
                ? new TripRoute({ route: message.route, id: message.tripId })
                : new FuzzyTripRoute({
                    route: message.route,
                    direction: message.direction,
                    date: message.operatingDay,
                    time:
                      message.tripStartTime.substring(0, 2) * 60 * 60 +
                      message.tripStartTime.substring(2, 4) * 60,
                  })
            }
           renderLoading={() => (
              <div className="card" style={{ height: '12rem' }}>
                <Loading />
              </div>
            )}
           renderFetched={data =>
              message.tripId ? (
                <TripMarkerPopup {...data} message={message} />
              ) : (
                <FuzzyTripMarkerPopup {...data} message={message} />
              )
            }
           />
           */}
          </Popup>
        </IconMarker>
      );
    });
}

VehicleMarkerContainer.propTypes = {
  tripStart: PropTypes.string,
  headsign: PropTypes.string,
  direction: PropTypes.number,
  ignoreMode: PropTypes.bool,
  vehicles: PropTypes.objectOf(
    PropTypes.shape({
      direction: PropTypes.number,
      tripStartTime: PropTypes.string,
      mode: PropTypes.string.isRequired,
      heading: PropTypes.number,
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

VehicleMarkerContainer.defaultProps = {
  tripStart: undefined,
  direction: undefined,
};

const connectedComponent = connectToStores(
  VehicleMarkerContainer,
  ['RealTimeInformationStore'],
  (context, props) => ({
    ...props,
    vehicles: context.getStore('RealTimeInformationStore').vehicles,
  }),
);

export {
  connectedComponent as default,
  VehicleMarkerContainer as Component,
  shouldShowVehicle,
  getVehicleIcon,
};
