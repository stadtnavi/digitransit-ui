import cx from 'classnames';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';

import Icon from './Icon';
import LocalTime from './LocalTime';
import RelativeDuration from './RelativeDuration';
import { dateOrEmpty } from '../util/timeUtils';
import withBreakpoint from '../util/withBreakpoint';
import { isKeyboardSelectionEvent } from '../util/browser';

const Itinerary = (
  {
    data,
    breakpoint,
    intermediatePlaces,
    zones,
    onlyHasWalkingItineraries,
    ...props
  },
  { intl, intl: { formatMessage } },
) => {
  const isTransitLeg = leg => leg.transitLeg;
  const refTime = moment(props.refTime);
  const startTime = moment(data.startTime);
  const endTime = moment(data.endTime);
  const duration = endTime.diff(startTime);
  const mobile = bp => !(bp === 'large');
  const vehicleNames = [];
  const noTransitLegs = false;

  if (noTransitLegs) {
    // TODO display message
    return null;
  }
  const firstDepartureLeg = data.legs.find(isTransitLeg);
  const { stoptimes } = firstDepartureLeg.trip;
  const origin = stoptimes[0].stop.name.split(',')[0];
  const boarding = firstDepartureLeg.from.name;
  const alighting = firstDepartureLeg.to.name;
  const agencyName = firstDepartureLeg.route.agency.name;
  const routeUrl = firstDepartureLeg.route.url;
  const destination = stoptimes[stoptimes.length - 1].stop.name.split(',')[0];

  const ariaLabelMessage = intl.formatMessage(
    {
      id: 'itinerary-page.show-details-label',
    },
    { number: props.hash + 1 },
  );

  const classes = cx([
    'itinerary-summary-row',
    'cursor-pointer',
    {
      passive: props.passive,
      'bp-large': breakpoint === 'large',
      'cancelled-itinerary': props.isCancelled,
      'no-border': false,
    },
  ]);

  //  accessible representation for summary
  const textSummary = (
    <div className="sr-only" key="screenReader">
      <FormattedMessage
        id="itinerary-summary-row.description"
        values={{
          departureDate: dateOrEmpty(startTime, refTime),
          departureTime: <LocalTime time={startTime} />,
          arrivalDate: dateOrEmpty(endTime, refTime),
          arrivalTime: <LocalTime time={endTime} />,
          firstDeparture:
            vehicleNames.length === 0 ? null : (
              <>
                <FormattedMessage
                  id="itinerary-summary-row.first-departure"
                  values={{
                    vehicle: vehicleNames[0],
                    departureTime: (
                      <LocalTime time={firstDepartureLeg.startTime} />
                    ),
                    stopName: firstDepartureLeg.from.name,
                  }}
                />
              </>
            ),
          transfers: [],
          totalTime: <RelativeDuration duration={duration} />,
        }}
      />
    </div>
  );
  const TIME_ROUNDING_INTERVAL = 15 * 60 * 1000;
  return (
    <span role="listitem" className={classes} aria-atomic="true">
      <h3 className="sr-only">
        <FormattedMessage
          id="summary-page.row-label"
          values={{
            number: props.hash + 1,
          }}
        />
      </h3>
      {textSummary}
      <div className="itinerary-summary-visible">
        {/* This next clickable region does not have proper accessible role, tabindex and keyboard handler
            because screen reader works weirdly with nested buttons. Same functonality works from the inner button */
        /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <>
          <div className="itinerary-summary-header einzelergebnis">
            <div
              className="summary-clickable-area"
              onClick={e => {
                if (mobile(breakpoint)) {
                  e.stopPropagation();
                  props.onSelectImmediately(props.hash);
                } else {
                  props.onSelect(props.hash);
                }
              }}
              onKeyPress={e =>
                isKeyboardSelectionEvent(e) && props.onSelect(props.hash)
              }
              tabIndex="0"
              role="button"
              aria-label={ariaLabelMessage}
            >
              <span key="ShowOnMapScreenReader" className="sr-only">
                <FormattedMessage id="itinerary-summary-row.clickable-area-description" />
              </span>

              <div className="start">{origin}</div>
              <h3 className="boarding">{boarding}</h3>
              <div className="match">
                <span className="match-value">99 % Übereinstimmung</span>
              </div>
              <div className="times">
                Mo – Fr | ca.{' '}
                <LocalTime
                  time={
                    Math.round(
                      firstDepartureLeg.startTime / TIME_ROUNDING_INTERVAL,
                    ) * TIME_ROUNDING_INTERVAL
                  }
                />{' '}
                Uhr
              </div>
              <h3 className="exit">{alighting}</h3>
              <div className="target">{destination}</div>
              <div className="portal">
                <a
                  className="link-external"
                  target="_blank"
                  rel="noreferrer"
                  title="Zum Angebot"
                  href={routeUrl}
                >
                  {agencyName}
                </a>
                <span className="info" />
              </div>
            </div>
            {mobile(breakpoint) !== true && (
              <div
                tabIndex="0"
                role="button"
                title={formatMessage({
                  id: 'itinerary-page.show-details',
                })}
                key="arrow"
                className="action-arrow-click-area flex-vertical noborder"
                onClick={e => {
                  e.stopPropagation();
                  props.onSelectImmediately(props.hash);
                }}
                onKeyPress={e =>
                  isKeyboardSelectionEvent(e) &&
                  props.onSelectImmediately(props.hash)
                }
                aria-label={ariaLabelMessage}
              >
                <div className="action-arrow flex-grow">
                  <Icon img="icon-icon_arrow-collapse--right" />
                </div>
              </div>
            )}
          </div>
          <span className="itinerary-details-container" aria-expanded="false" />
        </>
      </div>
    </span>
  );
};

Itinerary.propTypes = {
  refTime: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  passive: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onSelectImmediately: PropTypes.func.isRequired,
  hash: PropTypes.number.isRequired,
  children: PropTypes.node,
  breakpoint: PropTypes.string.isRequired,
  intermediatePlaces: PropTypes.array,
  isCancelled: PropTypes.bool,
  showCancelled: PropTypes.bool,
  zones: PropTypes.arrayOf(PropTypes.string),
  delayThreshold: PropTypes.number,
  onlyHasWalkingItineraries: PropTypes.bool,
};

Itinerary.defaultProps = {
  zones: [],
};

Itinerary.contextTypes = {
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired,
};

Itinerary.displayName = 'Itinerary';

const ItineraryWithBreakpoint = withBreakpoint(Itinerary);

export { Itinerary as component, ItineraryWithBreakpoint as default };
