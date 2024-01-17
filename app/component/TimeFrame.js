import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment-timezone';

import { TIME_PATTERN, DATE_PATTERN } from '../util/timeUtils';

const time = momentTime => (
  <span className="capitalize">{momentTime.format(TIME_PATTERN)}</span>
);

/**
 * Returns date time or time if same day as reference
 */
const dateTime = (momentTime, momentRefTime) => {
  if (momentTime.isSame(momentRefTime, 'day')) {
    return time(momentTime);
  }
  return (
    <span className="capitalize">
      <span className="timeframe-nextday">
        {momentTime.format(DATE_PATTERN)}
      </span>
      &nbsp;
      <span>{momentTime.format(TIME_PATTERN)}</span>
    </span>
  );
};

const TimeFrame = ({ className, startTime, endTime, refTime }) => {
  const now = moment(refTime);
  const start = moment(startTime);
  const end = moment(endTime);

  return (
    <span className={className}>
      {dateTime(start, now)}
      <span> - </span>
      {time(end)}
    </span>
  );
};

TimeFrame.description =
  'Displays the time frame of interval (example: 15:55 - 16:15)';

TimeFrame.propTypes = {
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  refTime: PropTypes.number.isRequired,
  className: PropTypes.string,
};

TimeFrame.displayName = 'TimeFrame';
export { TimeFrame as default };
