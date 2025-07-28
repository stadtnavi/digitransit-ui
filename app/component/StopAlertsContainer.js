import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { stopShape } from '../util/shapes';
import StopAlerts from './StopAlerts';

const StopAlertsContainer = ({ stop }) => {
  return <StopAlerts stop={stop} />;
};

StopAlertsContainer.propTypes = { stop: stopShape.isRequired };

const containerComponent = createFragmentContainer(StopAlertsContainer, {
  stop: graphql`
    fragment StopAlertsContainer_stop on Stop
    @argumentDefinitions(
      startTime: { type: "Long" }
      timeRange: { type: "Int", defaultValue: 3600 }
    ) {
      routes {
        gtfsId
      }
      gtfsId
      locationType
      alerts(types: [STOP, ROUTES, STOP_ON_ROUTES, STOP_ON_TRIPS]) {
        id
        alertDescriptionText
        alertHash
        alertHeaderText
        alertSeverityLevel
        alertUrl
        effectiveEndDate
        effectiveStartDate
        entities {
          __typename
          ... on StopOnRoute {
            route {
              color
              type
              mode
              shortName
              gtfsId
            }
            stop {
              gtfsId
            }
          }
          ... on Route {
            color
            type
            mode
            shortName
            gtfsId
          }
          ... on Stop {
            gtfsId
          }
        }
      }
      stoptimes: stoptimesWithoutPatterns(
        startTime: $startTime
        timeRange: $timeRange
        numberOfDepartures: 100
        omitCanceled: false
      ) {
        serviceDay
        scheduledDeparture
        headsign
        realtimeState
        trip {
          tripHeadsign
          route {
            gtfsId
            type
            color
            mode
            shortName
          }
        }
      }
    }
  `,
});

export { containerComponent as default, StopAlertsContainer as Component };
