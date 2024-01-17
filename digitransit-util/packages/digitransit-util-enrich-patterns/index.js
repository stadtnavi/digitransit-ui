/* eslint-disable no-bitwise */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import dayRangeAllowedDiff from '@digitransit-util/digitransit-util-day-range-allowed-diff';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment-timezone';

const DATE_FORMAT = 'YYYYMMDD';

/**
 * <DESCRIPTION>
 *
 * @name enrichPatterns
 * @param {object} patterns Array of patterns (result from GraphiQL query)
 * @param {boolean} onlyInFuture Is filtered out today's past trips
 * @param {number} serviceTimeRange How many days shows in UI
 * @returns {Object} enriched pattern
 * @example
 * digitransit-util.enrichPatterns([ { code: 'HSL:3002U:0:02', headsign: 'Kirkkonummi', stops: [{ name: 'Helsinki' }, { name: 'Kirkkonummi' }], tripsForDate: [], activeDates: [{ "day": [ "20200329" ] },{ "day": [ "20200329" ] },{ "day": [ "20200329" ] }, { "day": [ "20200329" ] }] } ], true, 30);
 * //=[ { code: 'HSL:3002U:0:02', headsign: 'Kirkkonummi', stops: [{ name: 'Helsinki' }, { name: 'Kirkkonummi' }], tripsForDate: [], activeDates: ["20200221","20200222","20200228","20200229"],  } ]
 */

function makeHash(s) {
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}

export default function enrichPatterns(
  patterns,
  onlyInFuture,
  serviceTimeRange,
) {
  const currentDate = moment();
  const lastRangeDate = moment()
    .add(serviceTimeRange, 'days')
    .format(DATE_FORMAT);

  let futureTrips = cloneDeep(patterns);
  futureTrips.forEach(function (x) {
    if (x.tripsForDate !== undefined) {
      x.tripsForDate = x.tripsForDate.filter(s => s.stoptimes.length > 0);
      x.countTripsForDate = x.tripsForDate.length;
    } else {
      x.tripsForDate = [];
      x.countTripsForDate = 0;
    }
    const uniqueDates = [];
    if (x.activeDates !== undefined) {
      x.activeDates.forEach(function (a) {
        a.day.forEach(function (b) {
          uniqueDates.push(b);
        });
      });
    } else {
      x.activeDates = [];
    }
    x.activeDates = Array.from(new Set(uniqueDates.sort()));
    if (
      x.activeDates.length === 1 &&
      moment(x.activeDates[0], DATE_FORMAT).isAfter(lastRangeDate)
    ) {
      x.activeDates = [];
    }
    if (x.stops) {
      const stopNames = x.stops.map(s => s.name);
      x.stopsHash = makeHash(stopNames.join(','));
    }
  });

  futureTrips = futureTrips.filter(
    f => f.tripsForDate.length > 0 || f.activeDates.length > 0,
  );

  for (let y = 0; y < futureTrips.length; y++) {
    const actDates = [];
    const dayNumbers = [];
    const minAndMaxDate = [];
    const dayDiff = [];
    const rangeFollowingDays = [];
    futureTrips[y].activeDates.forEach(function diffBetween(item, index, arr) {
      if (!actDates.includes[item]) {
        actDates.push(item);
      }
      const itemDate = moment(arr[index]);
      if (index === 0) {
        dayDiff.push(0);
        rangeFollowingDays.push([itemDate.format(DATE_FORMAT), 0]);
        minAndMaxDate[0] = itemDate.format(DATE_FORMAT);
        minAndMaxDate[1] = itemDate.format(DATE_FORMAT);
      } else {
        if (Number(itemDate.format(DATE_FORMAT) < Number(minAndMaxDate[0]))) {
          minAndMaxDate[0] = itemDate.format(DATE_FORMAT);
        }
        if (Number(itemDate.format(DATE_FORMAT) > Number(minAndMaxDate[1]))) {
          minAndMaxDate[1] = itemDate.format(DATE_FORMAT);
        }
      }

      dayNumbers.push(itemDate.format('E'));
      if (arr[index + 1]) {
        const diff = moment(arr[index + 1], DATE_FORMAT).diff(itemDate, 'days');
        if (diff !== 1) {
          rangeFollowingDays[rangeFollowingDays.length - 1][1] = arr[index];
          rangeFollowingDays.push([arr[index + 1], 0]);
        }
        dayDiff.push(diff);
      }

      if (index + 1 === dayDiff.length && dayDiff[index] === 1) {
        rangeFollowingDays[rangeFollowingDays.length - 1][1] = arr[index];
      }
    });

    futureTrips[y].currentDate = currentDate;
    futureTrips[y].lastRangeDate = lastRangeDate;
    futureTrips[y].rangeFollowingDays = rangeFollowingDays;
    futureTrips[y].dayDiff = dayDiff;
    futureTrips[y].activeDates = Array.from(new Set(actDates.sort()));
    futureTrips[y].allowedDiff = dayRangeAllowedDiff(
      dayNumbers,
      Number(currentDate.format('E')),
    );

    if (
      futureTrips[y].rangeFollowingDays.length === 1 &&
      (futureTrips[y].rangeFollowingDays[0][0] ===
        futureTrips[y].rangeFollowingDays[0][1] ||
        futureTrips[y].rangeFollowingDays[0][1] === 0)
    ) {
      futureTrips[y].fromDate = futureTrips[y].rangeFollowingDays[0][0];
      futureTrips[y].untilDate = futureTrips[y].rangeFollowingDays[0][0];
      futureTrips[y].rangeFollowingDays[0][1] = 0;
    } else if (
      futureTrips[y].rangeFollowingDays.length === 1 &&
      futureTrips[y].rangeFollowingDays[0][0] !==
        futureTrips[y].rangeFollowingDays[0][1]
    ) {
      if (moment(minAndMaxDate[0]).isAfter(currentDate.format(DATE_FORMAT))) {
        futureTrips[y].fromDate = futureTrips[y].rangeFollowingDays[0][0];
      } else {
        futureTrips[y].fromDate = '-';
      }
      if (
        moment(futureTrips[y].rangeFollowingDays[0][1]).isBefore(lastRangeDate)
      ) {
        futureTrips[y].untilDate = futureTrips[y].rangeFollowingDays[0][1];
      } else {
        futureTrips[y].untilDate = '-';
      }
    } else {
      futureTrips[y].fromDate = moment(minAndMaxDate[0])
        .subtract(futureTrips[y].allowedDiff, 'days')
        .isSameOrAfter(currentDate.format(DATE_FORMAT))
        ? `${minAndMaxDate[0]}`
        : '-';
      futureTrips[y].untilDate = moment(minAndMaxDate[1]).isBefore(
        lastRangeDate,
      )
        ? `${minAndMaxDate[1]}`
        : '-';
    }

    futureTrips[y].activeDates = futureTrips[y].activeDates.filter(
      ad => moment(ad).isSameOrAfter(currentDate.format(DATE_FORMAT)) === true,
    );

    futureTrips[y].minAndMaxDate = minAndMaxDate;
    futureTrips[y].inFuture =
      Number(moment().startOf('isoWeek')) <
      Number(moment(futureTrips[y].minAndMaxDate[0]).startOf('isoWeek'));
  }

  futureTrips = futureTrips.filter(
    f => f.tripsForDate.length > 0 || f.activeDates.length > 0,
  );

  // DT-2531: shows main routes (both directions) if there is no futureTrips
  if (futureTrips.length === 0 && patterns.length > 0) {
    futureTrips = patterns.filter(p => p.code.endsWith(':01'));
  }

  return futureTrips;
}
