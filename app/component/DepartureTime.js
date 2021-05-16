import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { intlShape } from 'react-intl';

import Icon from './Icon';
import LocalTime from './LocalTime';

import ComponentUsageExample from './ComponentUsageExample';
import {
  currentTime as exampleCurrentTime,
  departure as exampleDeparture,
  realtimeDeparture as exampleRealtimeDeparture,
} from './ExampleData';

function DepartureTime(props, context) {
  let shownTime;
  const timeDiffInMinutes = Math.floor(
    (props.departureTime - props.currentTime) / 60,
  );
  if (timeDiffInMinutes <= -1) {
    shownTime = undefined;
  } else if (timeDiffInMinutes <= context.config.minutesToDepartureLimit) {
    shownTime = context.intl.formatMessage(
      { id: 'departure-time-in-minutes', defaultMessage: '{minutes} min' },
      { minutes: timeDiffInMinutes },
    );
  }

  return (
    <React.Fragment>
      {!props.isNextDeparture && (
        <span
          style={props.style}
          className={cx(
            'time',
            {
              realtime: props.realtime,
              canceled: props.canceled,
            },
            props.className,
          )}
        >
          {shownTime}
        </span>
      )}
      <span
        style={props.style}
        className={cx(
          'time',
          {
            realtime: props.realtime,
            canceled: props.canceled,
            first: !props.isNextDeparture,
            next: props.isNextDeparture,
          },
          props.className,
        )}
      >
        {props.isNextDeparture &&
          `${context.intl.formatMessage({
            id: 'next',
            defaultMessage: 'Next',
          })} `}
        <LocalTime forceUtc={props.useUTC} time={props.departureTime} />
      </span>
      {props.canceled && props.showCancelationIcon && (
        <Icon className="caution" img="icon-icon_caution" />
      )}
    </React.Fragment>
  );
}

DepartureTime.contextTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  config: PropTypes.object.isRequired,
};

DepartureTime.description = () => (
  <div>
    <p>
      Display time in correct format. Displays minutes for 20 minutes, otherwise
      in HH:mm format. Also, it takes into account if the time is realtime. The
      prop useUTC forces rendering in UTC, not local TZ, for testing.
    </p>
    <ComponentUsageExample description="real time">
      <DepartureTime
        departureTime={exampleRealtimeDeparture.stoptime}
        realtime={exampleRealtimeDeparture.realtime}
        currentTime={exampleCurrentTime}
        useUTC
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="not real time">
      <DepartureTime
        departureTime={exampleDeparture.stoptime}
        realtime={exampleDeparture.realtime}
        currentTime={exampleCurrentTime}
        useUTC
      />
    </ComponentUsageExample>
    <ComponentUsageExample description="canceled">
      <DepartureTime
        departureTime={exampleDeparture.stoptime}
        realtime={exampleDeparture.realtime}
        currentTime={exampleCurrentTime}
        canceled
        useUTC
      />
    </ComponentUsageExample>
  </div>
);

DepartureTime.displayName = 'DepartureTime';

DepartureTime.propTypes = {
  className: PropTypes.string,
  canceled: PropTypes.bool,
  currentTime: PropTypes.number.isRequired,
  departureTime: PropTypes.number.isRequired,
  realtime: PropTypes.bool,
  style: PropTypes.object,
  useUTC: PropTypes.bool,
  showCancelationIcon: PropTypes.bool,
  isNextDeparture: PropTypes.bool,
};

DepartureTime.defaultProps = {
  showCancelationIcon: false,
  isNextDeparture: false,
};

DepartureTime.contextTypes = {
  config: PropTypes.object.isRequired,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default DepartureTime;

/**
 * maps stoptime to data structure required by DepartureTime. This is copied
 * from departure-list-container.
 *
 *  @param stoptime stoptime from graphql
 *  @param pattern pattern from graphql
 */

export const mapStopTime = (stoptime, pattern) => ({
  stop: stoptime.stop,
  canceled: stoptime.realtimeState === 'CANCELED',
  departureTime:
    stoptime.serviceDay +
    (stoptime.realtimeState === 'CANCELED' || stoptime.realtimeDeparture === -1
      ? stoptime.scheduledDeparture
      : stoptime.realtimeDeparture),
  realtime: stoptime.realtimeDeparture !== -1 && stoptime.realtime,
  pattern: pattern && pattern.pattern,
  trip: stoptime.trip,
});

/**
 * maps stoptime to DepartureTime component
 *  @param stoptime stoptime from graphql
 *  @param currentTime
 *  @param showCancelationIcon whether an icon should be shown if the departure is canceled.
 *  @param isNextDeparture whether a string "Next" should rendered instead of departure time in minutes
 */
export const fromStopTime = (
  stoptime,
  currentTime,
  showCancelationIcon = true,
  isNextDeparture = false,
) => (
  <DepartureTime
    currentTime={currentTime}
    {...mapStopTime(stoptime)}
    showCancelationIcon={showCancelationIcon}
    isNextDeparture={isNextDeparture}
  />
);
